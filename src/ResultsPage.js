import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup, Image, Figure, Container, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import { SHA3 } from 'sha3';

function ResultsPage(props) {
    const navigate = useNavigate();
    const [listings, setListings] = useState([])
    //TODO: Link to server
    const requestResults = async () => {
        try {
            if (!props.query) {
                //const response = await api.get('/listings/');

                // Get the returned listings, create new objects for each.


                // Login successfully worked --> navigate to the landing page in the AppRouter
            } else {

            }
            //setListings(response.data);
            setListings(
                [
                    {
                        "uuid": 1,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "This is a nice flat for students looking to be close to both the university and the party scene in Zurich",
                        "address": {
                            "houseNr": 11,
                            "streetName": "Langstrasse",
                            "city": "Zurich",
                            "postcode": "8005"
                        },
                        "published": true,
                        "pictures": [],
                        "sqm": 82,
                        "type": {
                            type: "FLAT"
                        },
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 3150,
                        "deposit": 5000,
                        "rooms": 3.5
                    },
                    {
                        "uuid": 2,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "This is a nice flat for students looking to be close to both the university and the party scene in Zurich",
                        "address": {
                            "houseNr": 11,
                            "streetName": "Langstrasse",
                            "city": "Zurich",
                            "postcode": "8005"
                        },
                        "published": true,
                        "pictures": [],
                        "sqm": 82,
                        "type": {
                            type: "FLAT"
                        },
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 3150,
                        "deposit": 5000,
                        "rooms": 3.5
                    },
                    {
                        "uuid": 3,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "This is a nice flat for students",
                        "address": {
                            "houseNr": 11,
                            "streetName": "Langstrasse",
                            "city": "Zurich",
                            "postcode": "8005"
                        },
                        "published": true,
                        "pictures": [],
                        "sqm": 82,
                        "type": {
                            type: "FLAT"
                        },
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 31500,
                        "deposit": 5000,
                        "rooms": 3.5
                    },
                    {
                        "uuid": 4,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "This is a nice flat for students looking to be close to both the university and the party scene in Zurich",
                        "address": {
                            "houseNr": 11,
                            "streetName": "Langstrasse",
                            "city": "Zurich",
                            "postcode": "8005"
                        },
                        "published": true,
                        "pictures": [],
                        "sqm": 82,
                        "type": {
                            type: "ROOM"
                        },
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 3150,
                        "deposit": 5000,
                        "rooms": 3.5
                    }
                ]

            );

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        requestResults();
    }, []);

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

    const openAdOverview = (any) => {
        navigate('/listings/' + any);
    }

    return (
        <div>
            <Container fluid style={{ paddingLeft: 40, paddingRight: 0, paddingTop: 60 }}>
                {listings.map((listing) => (
                    <div className='d-inline-block border border-dark rounded' style={{ marginRight: 20, marginBottom: 3, width: "45%" }} onClick={() => openAdOverview(listing.uuid)}>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <Figure>
                                        <Figure.Image
                                            alt="Cannot load image"
                                            src="https://is1-2.housingcdn.com/4f2250e8/73b4c8375352d2558cc55aeb0bb7f937/v0/fs/devi_shanmuga_flats-surappattu-chennai-devi_flat_promoters.jpeg"
                                        />
                                    </Figure>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Row className='g-2'>
                                    <Col md={5}>
                                        <h4>{listing.rent} CHF</h4>
                                    </Col>
                                    <Col md={3}>
                                        <p>{listing.sqm} m<sup>2</sup></p>
                                    </Col>
                                    <Col md={4}>
                                        <p>{listing.rooms} Rooms</p>
                                    </Col>
                                </Row>
                                <Row className='g-2'>
                                    <h5>{listing.address.streetName} {listing.address.houseNr}, {listing.address.postcode} {listing.address.city}</h5>
                                </Row>
                                <Row className='g-2'>
                                    <div>
                                        {decideColor(listing.type.type)}
                                    </div>

                                </Row>
                                <Row className='g-2'>
                                    <Col lg='auto'>
                                    <p>{listing.description}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col>
                                        
                                        <Button type="button" outlined={true} variant="primary">Contact Info</Button>
                                        
                                    </Col>
                                </Row>
                                    
                                
                               

                            </Col>
                        </Row>


                    </div>
                ))}
            </Container>
        </div >
    )

}

export default ResultsPage;