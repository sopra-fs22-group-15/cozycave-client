import {Button, Row, Col, Container, Alert, ToastHeader} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import React, {useState, useEffect, useContext} from 'react';
import {api, handleError} from './helpers/api'
import {mockListings} from './components/util/mockListings';
import {decideBadgeColorListingType} from './helpers/decideColorByListingType';
import {decideGender} from './helpers/decideGender';
import {displayPictures} from './helpers/displayPictures';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import {AuthContext} from "./context/auth-context";


function AdOverviewPage() {
    let response = null;
    const [listingMapURL, setListingMapURL] = useState('https://map.geo.admin.ch/embed.html?lang=en&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,ch.astra.wanderland-sperrungen_umleitungen&layers_opacity=1,1,1,0.8,0.8&layers_visibility=false,false,false,false,false&layers_timestamp=18641231,,,,');
    const {id} = useParams();
    let address = ''; //do not use this in the returned form
    const [listing, setListing] = useState([]);
    const [travelTimes, setTravelTimes] = useState([])

    const locationAPI = axios.create({
        baseURL: 'https://transport.opendata.ch/v1',
        headers: {'Content-Type': 'application/json'}
    });

    const auth = useContext(AuthContext);

    const requestListing = async () => {
        try {
            response = await api.get(`/listings/${id}`);
            setListing(response.data);
            address = response.data.address;
        } catch (error) {
            alert(`Something went wrong during page loading: \n${handleError(error)}`);
            setListing([mockListings[0]])
            address = mockListings[0].address;
        }
        requestLocation(address);

    }

    const replaceGermanCharsInString = (string) => { //This is needed for the map query
        let replacedString = string.replace('ä', 'ae');
        replacedString = replacedString.replace('ö', 'oe');
        replacedString = replacedString.replace('ü', 'ue');
        replacedString = replacedString.replace('Ä', 'Ae');
        replacedString = replacedString.replace('Ö', 'Oe');
        replacedString = replacedString.replace('Ü', 'Ue'); //can be converted to single regex expression
        return (replacedString)

    }

    const formatTravelDuration = (string) => {
        let alertType = 'danger'
        if (string === undefined || string === null) {
            return <Alert variant={'danger'}>Could not calculate travel time</Alert>
        } else if (string.length > 0) {
            let formattedString = (string.slice(0, 2) === "00" ? '' :
                    (string.slice(0, 1) === "0" ? '' : string.slice(0, 1)) +
                    +(string.slice(1, 2) === "0" ? '' : string.slice(1, 2)) + ' days ') +
                (string.slice(3, 5) === "00" ? '' :
                    (string.slice(3, 4) === "0" ? '' : string.slice(3, 4)) +
                    +(string.slice(4, 5) === "0" ? '' : string.slice(4, 5)) + ' hours ') +
                (string.slice(6, 8) === "00" ? '' :
                    (string.slice(6, 7) === "0" ? '' : string.slice(6, 7)) +
                    +(string.slice(7, 8) === "0" ? '' : string.slice(7, 8)) + ' minutes ')

            if (formattedString.includes('days')) {
                alertType = 'danger'
            } else if (formattedString.includes('hours')) {
                alertType = 'warning'
            } else if (formattedString.includes('minutes')) {
                alertType = 'success'
            }
            return <Alert variant={alertType}>{formattedString}</Alert>
        } else {
            return <Alert variant={'danger'}>Could not calculate travel time</Alert>
        }
    }
    const user = JSON.parse(localStorage.getItem('user'));

    //const handleReport = () => {
    //    toast.error('An admin will review this listing. Thanks for your report')
    //}

    const handleApply = async () => {
        if (!user) {
            toast.warn("Log in to apply");
        } else {
            if (user.role === "LANDLORD") {
                toast.warn("You can only apply to listings as a student")
            } else {
                let applyUser = {
                    id: user.id, //auth.user.id
                    role: user.role,
                    details: {
                        address: user.details.address,
                        gender: user.details.gender,
                        first_name: user.details.first_name,
                        last_name: user.details.last_name,
                        phone_number: user.details.phone_number
                    }
                }
                const application = JSON.stringify({
                    applicant: applyUser,
                    listing: listing,
                    application_status: "PENDING"
                })
                try {
                    let applyResponse = await api.post(`/listings/${id}/applications`, application);


                    toast.success('Successfully applied!');

                } catch (error) {
                    toast.warn(error.response.data.message);
                }
            }
        }
    }

    const requestLocation = async (address) => {
        try {
            let query = `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${replaceGermanCharsInString(address.street)}%20${address.house_number}%20${address.zip_code}&type=locations&limit=1`
            let location = await api.get(query);
            let path = location.data.results[0].attrs
            if (location.data !== null) {
                let frameLink = `https://map.geo.admin.ch/embed.html?lang=en&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,ch.astra.wanderland-sperrungen_umleitungen&layers_opacity=1,1,1,0.8,0.8&layers_visibility=false,false,false,false,false&layers_timestamp=18641231,,,,&E=${path.y}&N=${path.x}&zoom=10`
                setListingMapURL(frameLink);
                calculateTravelTime(replaceGermanCharsInString(address.street), address.house_number, address.zip_code)
            }


        } catch (error) {
            toast.warn("Couldn't find specified address :( Feel free to use the map yourself")
        }
    }

    const calculateTravelTime = async (street, house_number, zip_code) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user == null) {
                return <p>Please log in to see estimated travel times</p>
            } else {
                address = user.details.address;
                let address2 = await api.get(`users/${user.id}/specialaddress`)[0]
                let response = await locationAPI.get(`/connections?from=${address.street}%20${address.house_number}%20${address.zip_code}&to=${street}%20${house_number}%20${zip_code}`)
                let response2 = null;
                if (address2) {
                    response2 = await locationAPI.get(`/connections?from=${address2.street}%20${address2.house_number}%20${address2.zip_code}&to=${street}%20${house_number}%20${zip_code}`)
                    setTravelTimes([response.data.connections[0].duration, response2.data.connections[0].duration])
                } else {
                    setTravelTimes([response.data.connections[0].duration, null])
                }
                //TODO: fix when address structure is available
            }
        } catch (error) {
            toast.warn('Could not calculate travel times');
        }

    }

    const displayAddress = () => {
        if (listing.address !== undefined) {
            return (
                <h4>{listing.address.street} {listing.address.house_number}, {listing.address.zip_code} {listing.address.city}</h4>
            )
        } else {
            return (
                <h4>No address available</h4>
            )
        }
    }

    useEffect(() => {
        requestListing();
    }, []);
    console.log(listing)
    return (
        <Container fluid={true}>
            <ToastContainer/>
            <Row style={{marginTop: '4em'}}>
                <Col md={5}>
                    {<img src={displayPictures(listing.pictures)} alt="listing" style={{width: '100%'}}/>}
                </Col>
                <Col md={7}>
                    <div className='border-bottom border-dark'>
                        <Row>
                            <Col>
                                <h4 className='opacity-50'>Rent</h4>
                                <h2>CHF {listing.rent}</h2>
                            </Col>
                            <Col>
                                <h4 className='opacity-50'>Area</h4>
                                <h2>{listing.sqm} m<sup>2</sup></h2>
                            </Col>
                            <Col>
                                <h4 className='opacity-50'>Rooms</h4>
                                <h2>{listing.rooms}</h2>
                            </Col>
                        </Row>
                    </div>
                    <div className='border-bottom border-dark'>
                        <Row className='mt-2'>
                            <h4 className='opacity-50'>Address</h4>
                        </Row>
                        <Row>
                            <Col>
                                {displayAddress()}
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <div>
                                {decideBadgeColorListingType(listing.listing_type)}
                            </div>

                        </Row>
                        <Row className='mt-2'>
                            <h4 className='opacity-50'>Description</h4>
                        </Row>
                        <Row>

                            <span>{listing.description}</span>

                        </Row>
                    </div>
                    <Row md={2}>
                        <Col md="auto">
                            <h4 className='opacity-50'>Additional Information</h4>
                            <ul>
                                <li>Preferred applicant
                                    gender: {decideGender(listing.available_to ? listing.available_to : null)}
                                </li>
                                <li>{(listing.furnished) ? 'Furnished' : 'Unfurnished'}</li>
                                <li>Deposit: {listing.deposit} CHF</li>
                            </ul>
                            <h5>Travel Times to your addresses:</h5>
                            <p>Address 1 {formatTravelDuration(travelTimes[0])}</p>
                            <p>Address 2 {formatTravelDuration(travelTimes[1])}</p>
                            <div className='align-self-end'>
                                <Button style={{marginBottom: '3rem'}} type="button" size='lg' variant="primary"
                                        onClick={() => handleApply()}>Apply</Button>
                            </div>
                        </Col>
                        <Col>
                            <iframe src={listingMapURL}
                                    width='400' height='300' frameBorder='0' allow='geolocation'></iframe>
                        </Col>
                    </Row>

                </Col>
            </Row>

        </Container>


    )

}

export default AdOverviewPage;