import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup, Image, Figure, Container, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';

function ResultsPage(props) {
    const navigate = useNavigate();
    const [listings, setListings] = useState([])
    let response = null;
    
    const requestResults = async () => {
        try {
            if (!props.query) {
                // Get the returned listings, create new objects for each.
                response = await api.get('/listings');
                
            } else {
                //for future search terms
            }
            setListings(response.data);

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
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
                        "pictures": ['https://is1-2.housingcdn.com/4f2250e8/73b4c8375352d2558cc55aeb0bb7f937/v0/fs/devi_shanmuga_flats-surappattu-chennai-devi_flat_promoters.jpeg'],
                        "sqm": 82,
                        "type": "FLAT",
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
                        "description": "Nice, quiet flat for a low price",
                        "address": {
                            "houseNr": 20,
                            "streetName": "Irchelstrasse",
                            "city": "Zurich",
                            "postcode": "8001"
                        },
                        "published": true,
                        "pictures": ['https://bsmedia.business-standard.com/_media/bs/img/article/2018-06/08/full/1528397457-4687.jpg'],
                        "sqm": 82,
                        "type": "FLAT",
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 1000,
                        "deposit": 2500,
                        "rooms": 2
                    },
                    {
                        "uuid": 3,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "Located in the heart of the city, perfect for those who like to live a busy life",
                        "address": {
                            "houseNr": 15,
                            "streetName": "Paradeplatz",
                            "city": "Zurich",
                            "postcode": "8001"
                        },
                        "published": true,
                        "pictures": ['https://cf.bstatic.com/xdata/images/hotel/max500/270853248.jpg?k=2a541c2ab4282babde3b0f5d90e00d7cbe4aa382b28876ee59936fd1ed84e5ac&o=&hp=1'],
                        "sqm": 82,
                        "type": "FLAT",
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 6000,
                        "deposit": 10000,
                        "rooms": 4
                    },
                    {
                        "uuid": 4,
                        "creation_date": "30.10.2000",
                        "name": "flat name",
                        "description": "Small, cheap room close to the university and shops with friendly roommates",
                        "address": {
                            "houseNr": 11,
                            "streetName": "Langstrasse",
                            "city": "Zurich",
                            "postcode": "8005"
                        },
                        "published": true,
                        "pictures": ['https://flatfox.ch/media/ff/2022/04/697b6p0hwq2959ebnviuyuedkvnt4yp3qavkhcq2r1w1md12q1.jpg'],
                        "sqm": 82,
                        "type": "ROOM",
                        "furnished": true,
                        "availableTo": ['Male', 'Female', 'Other'],
                        "available": true,
                        "rent": 500,
                        "deposit": 500,
                        "rooms": 1
                    }
                ]

            );
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
        navigate('/v1/listings/' + any);
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
                                            src={listing.pictures[0]}
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
                                        <p>{listing.rooms} Room{listing.rooms>1?'s':null}</p>
                                    </Col>
                                </Row>
                                <Row className='g-2'>
                                    <h5>{listing.address.streetName} {listing.address.houseNr}, {listing.address.postcode} {listing.address.city}</h5>
                                </Row>
                                <Row className='g-2'>
                                    <div>
                                        {decideColor(listing.type)}
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