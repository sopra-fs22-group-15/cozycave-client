import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup, Figure, Container, Badge } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import axios from 'axios';
import Application from './components/schemas/Application';

function AdOverviewPage(props) {
    let response = null;
    const navigate = useNavigate();
    const { id } = useParams();
    const [listing, setListing] = useState([]);
    const requestListing = async () => {
        try {
            //response = await api.get('/listings/',id);
            //setListing(response.data);

            setListing([{
                "uuid": 1,
                "creation_date": "30.10.2000",
                "name": "flat name",
                "description": "This is a nice flat for students looking to be close to both the university and the party scene in Zurich This is a nice flat for students looking to be close to both the university and the party scene in ZurichThis is a nice flat for students looking to be close to both the university and the party scene in ZurichThis is a nice flat for students looking to be close to both the university and the party scene in ZurichThis is a nice flat for students looking to be close to both the university and the party scene in Zurich",
                "address": {
                    "houseNr": 11,
                    "streetName": "Langstrasse",
                    "city": "Zurich",
                    "postcode": "8005"
                },
                "published": true,
                "pictures": ["https://is1-2.housingcdn.com/4f2250e8/73b4c8375352d2558cc55aeb0bb7f937/v0/fs/devi_shanmuga_flats-surappattu-chennai-devi_flat_promoters.jpeg", "https://is1-2.housingcdn.com/4f2250e8/73b4c8375352d2558cc55aeb0bb7f937/v0/fs/devi_shanmuga_flats-surappattu-chennai-devi_flat_promoters.jpeg"],
                "sqm": 82,
                "type": "FLAT",
                "furnished": true,
                "availableTo": ['Male', 'Female', 'Other'],
                "available": true,
                "rent": 3150,
                "deposit": 5000,
                "rooms": 3.5
            },]);

        } catch (error) {
            alert(`Something went wrong during page loading: \n${handleError(error)}`);
        }


    }

    const decideColor = (any) => {
        if (any === "FLAT") {
            return (
                <Badge bg="primary">Flat</Badge>
            )
        } else {
            return (
                <Badge bg="success">Room</Badge>
            )
        }
    };

    const processGender = (any) => {
        if (any.length == 3) {
            return (
                "Any"
            )
        } else if (any[0] === "FEMALE") {
            return (
                "Female"
            )

        } else {
            return (
                "Male"
            )
        }
    };

    const handleApply = async () => {
        //const user = localStorage.getItem('user');
        //const listing = response.data;
        //const application = new Application(id, null, user, listing, "pending");
        try {
            //applyResponse = await api.post('/listings/',id,'/applications/');
            //TODO: add to profile here
            alert('Successfully applied!')

        } catch (error) {
            alert(`Something went wrong during page loading: \n${handleError(error)}`);
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
                                <Figure>
                                    <Figure.Image
                                        alt="Listing image"
                                        src={ad.pictures[0]}
                                    />
                                </Figure>
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
                                        <h3>{ad.address.streetName} {ad.address.houseNr}, {ad.address.postcode} {ad.address.city}</h3>
                                    </Row>
                                    <Row class='mb-2'>
                                        <div>
                                            {decideColor(ad.type)}
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
                                            <li>Preferred applicant gender: {processGender(ad.availableTo)}</li>
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
                                        <Figure>
                                            <Figure.Image
                                                alt="Listing Location"
                                                src="https://cdn-agkod.nitrocdn.com/HHTsYSGsDyZLTePzRyQWYMiOFmYfcDWX/assets/static/optimized/rev-ef045a0/wp-content/uploads/2017/06/Zurich-AirBnb-1-Penthouse-River-View-map.jpg"
                                            />
                                        </Figure>
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