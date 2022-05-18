import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup, Figure, Container, Badge } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import axios from 'axios';
import Application from './components/schemas/Application';
import { mockListings } from './components/util/mockListings';
import { addressStringBuilder } from './helpers/addressStringBuilder';
import { decideBadgeColorListingType } from './helpers/decideColorByListingType';
import { decideGender } from './helpers/decideGender';
import { displayPictures } from './helpers/displayPictures';

function AdOverviewPage(props) {
    let response = null;
    const [listingMapURL, setListingMapURL] = useState('https://map.geo.admin.ch/embed.html?lang=en&topic=ech&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,ch.astra.wanderland-sperrungen_umleitungen&layers_opacity=1,1,1,0.8,0.8&layers_visibility=false,false,false,false,false&layers_timestamp=18641231,,,,&E=2682872.25&N=1247585.63&zoom=10');
    const navigate = useNavigate();
    const { id } = useParams();
    let address = '';
    const [listing, setListing] = useState([]);

    const locationAPI = axios.create({
        baseURL: 'http://transport.opendata.ch/v1',
        headers: { 'Content-Type': 'application/json' }
      });
      
    const requestListing = async () => {
        try {
            response = await api.get('/listings/', id);
            setListing(response.data);
            address = response.data[0].address;
        } catch (error) {
            alert(`Something went wrong during page loading: \n${handleError(error)}`);
            setListing([mockListings[0]])
            address = mockListings[0].address;
        }
        requestLocation(address);

    }

    const handleApply = async () => {
        const user = localStorage.getItem('user');
        const application = JSON.stringify({
            authentication: {
                email: user.authentication.email,
                password: user.authentication.token
            },
            id: id,
            application_status: "PENDING"
        })
        try {
            let applyResponse = await api.post('/listings/',id,'/applications');

            alert('Successfully applied!')

        } catch (error) {
            alert(`Something went wrong during application process: \n${handleError(error)}`);
        }

    }

    const requestLocation = async (address) => {
        try {
            let query = `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${address.street}%20${address.house_number}%20${address.zip_code}&type=locations&limit=1`
            let location = await api.get(query);
            let path = location.data.results[0].attrs
            if (location.data !== null) {
                let frameLink = `https://map.geo.admin.ch/embed.html?lang=en&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,ch.astra.wanderland-sperrungen_umleitungen&layers_opacity=1,1,1,0.8,0.8&layers_visibility=false,false,false,false,false&layers_timestamp=18641231,,,,&E=${path.y}&N=${path.x}&zoom=10`
                setListingMapURL(frameLink);
                calculateTravelTime(address.street, address.house_number, address.zip_code)
            };

        } catch (error) {
            alert(`Something went wrong during location display: \n${handleError(error)}`);
        }
    }

    const calculateTravelTime = async (street, house_number, zip_code) => {
        try {
            //const user = localStorage.get('user')
            //if(user==null){
            //  return <p>Please log in to see estimated travel times<p>    
            //}else{}
            //user.addresses.forEach(address => )
            address={
                street: "Schulhausstrasse",
                house_number: "9",
                zip_code: "8127",
                city: "Forch",
            }
            response = await locationAPI.get(`/connections?from=${address.street}%20${address.house_number}%20${address.zip_code}&to=${street}%20${house_number}%20${zip_code}`)
            console.log(response.connections.duration)

        } catch (error) {
            alert(`Something went wrong during calculation of travel time: \n${handleError(error)}`);
        }

    }

    useEffect(() => {
        requestListing();
    }, []);

    return (
        <div>
            <Container fluid={true}>
                {listing.map((ad) => (
                    <div className='d-inline-block border border-dark rounded' style={{ marginTop: 60, height: "60%" }}>
                        <Row>
                            <Col>
                                {displayPictures(ad.picture.url)}
                            </Col>
                            <Col style={{ marginRight: 20 }}>
                                <div className='border-bottom border-dark'>
                                    <Row>
                                        <Col>
                                            <h4 class='opacity-50'>Rent</h4>
                                            <h2>CHF {ad.rent}</h2>
                                        </Col>
                                        <Col>
                                            <h4 class='opacity-50'>Area</h4>
                                            <h2>{ad.sqm} m<sup>2</sup></h2>
                                        </Col>
                                        <Col>
                                            <h4 class='opacity-50'>Rooms</h4>
                                            <h2>{ad.rooms}</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='border-bottom border-dark'>
                                    <Row class='mt-2'>
                                        <h4 class='opacity-50'>Address</h4>
                                    </Row>
                                    <Row>
                                        <h3>{ad.address.street} {ad.address.house_number}, {ad.address.zip_code} {ad.address.city}</h3>
                                    </Row>
                                    <Row class='mb-2'>
                                        <div>
                                            {decideBadgeColorListingType(ad.listing_type)}
                                        </div>

                                    </Row>
                                    <Row class='mt-2'>
                                        <h4 class='opacity-50'>Description</h4>
                                    </Row>
                                    <Row>

                                        <p>{ad.description}</p>

                                    </Row>
                                </div>
                                <Row style={{ width: '90%' }}>
                                    <Col>
                                        <h4 class='opacity-50'>Additional Information</h4>
                                        <ul>
                                            <li>Preferred applicant gender: {decideGender(ad.availableTo)}</li>
                                            <li>{(ad.furnished) ? 'Furnished' : 'Unfurnished'}</li>
                                            <li>Deposit: {ad.deposit} CHF</li>
                                        </ul>
                                        <div class='align-self-end'>
                                            <Button type="button" size='lg' variant="primary" onClick={() => handleApply()}>Apply</Button>
                                            <span> </span>
                                            <Button type="button" size='lg' variant="outline-danger">Report</Button>
                                        </div>
                                    </Col>
                                    <Col>
                                        <iframe src={listingMapURL}
                                            width='400' height='300' frameBorder='0' allow='geolocation'></iframe>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>

        </div>

    )

}

export default AdOverviewPage;