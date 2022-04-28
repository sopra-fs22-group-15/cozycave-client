import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import "../../styles/CreateAd.scss";
import Address from "../schemas/Address";
import {api} from "../../helpers/api";

const CreateAd = () => {
    const [address, setAddress] = React.useState(null);
    const [streetName, setStreetName] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [rent, setRent] = React.useState('');
    const [area, setArea] = React.useState('');
    const [rooms, setRooms] = React.useState('');
    const submitListing = async () => {
        try {
            const response = await api.post('/listings');
        } catch (e) {
            console.log(e);
        }
    };

    const createListing = () => {
        setAddress(new Address(streetName, houseNumber, city, postalCode));
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card className="menu-card">
                <Card.Header className="d-flex justify-content-around" style={{backgroundColor: "#708AFF"}}>
                    <div className="header-group">
                        <img src="https://via.placeholder.com/500x300.png?text=Flat" alt="profile"
                             className="listing-header-image"
                             height="350"/>
                        <Button variant="outline-light" className="d-flex justify-content-center">
                            <span style={{marginRight: "10px"}}>Edit Image</span>
                            <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                    </div>
                    <div className="header-group">
                        <img src="https://via.placeholder.com/500x300.png?text=Floorplan" alt="profile"
                             className="listing-header-image"
                             height="350"/>
                        <Button variant="outline-light" className="d-flex justify-content-center">
                            <span style={{marginRight: "10px"}}>Edit Floorplan</span>
                            <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={createListing}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Street Name</Form.Label>
                                    <Form.Control type="text" placeholder="Rämistrasse" onChange={e => {
                                        setAddress(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Label>House Nr.</Form.Label>
                                    <Form.Control type="text" placeholder="87" onChange={e => {
                                        setAddress(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type="text" placeholder="8008" onChange={e => {
                                        setPostalCode(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Zurich" onChange={e => {
                                        setCity(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control type="text" placeholder="150m²" onChange={e => {
                                        setArea(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Rooms</Form.Label>
                                    <Form.Control type="text" placeholder="3.5" onChange={e => {
                                        setRooms(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Rent</Form.Label>
                                    <Form.Control type="text" placeholder="CHF 1000" onChange={e => {
                                        setRent(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Deposit</Form.Label>
                                    <Form.Control type="text" placeholder="5000" onChange={e => {
                                        setDeposit(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Available To</Form.Label>
                                    <Form.Select>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                        <option>Anybody</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="5" placeholder="Add a description of the flat here..."
                                              onChange={e => (setDescription(
                                                  e.target.value
                                              ))}/>
                            </Form.Group>
                        </Row>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col className="d-flex justify-content-center align-content-center">
                            <Button variant="primary" type="submit" onClick={submitListing}>
                                <span>Create Listing</span>
                            </Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Container>
);
};

export default CreateAd;
