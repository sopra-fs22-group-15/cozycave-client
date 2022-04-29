import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup, Figure, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import axios from 'axios';

function AdOverviewPage(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [listing, setListing] = useState([]);

    const requestListing = async () => {
        try {
            //const response = await api.get('/listings/',id);
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
                "type": {
                    type: "FLAT"
                },
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
                                        alt="Cannot load image"
                                        src={ad.pictures[0]}
                                    />
                                </Figure>
                            </Col>
                            <Col style={{marginRight:20}}>
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
                                
                                <Row class='mt-2'>
                                    <h4 class='opacity-50'>Address</h4>
                                </Row>
                                <Row>
                                    <h3>{ad.address.streetName} {ad.address.houseNr}, {ad.address.postcode} {ad.address.city}</h3>
                                </Row>
                                <Row>
                                <h4 class='opacity-50'>Description</h4>
                                </Row>
                                <Row>
                                    <p>{ad.description}</p>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col md='auto'>
                                    <Button type="button" size='lg' variant="primary">Apply</Button>
                                    <span> </span>
                                    <Button type="button" size='lg' variant="outline-danger">Report</Button>
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