import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import "../../styles/CreateAd.scss";

import {api} from "../../helpers/api";
import Listing from "../schemas/Listing";
import {addressCreator} from "../util/addressCreator";

const CreateAd = () => {

    //TODO: add authorization check, only display if user is signed in a seller

    const [validated, setValidated] = React.useState(false);

    const [address, setAddress] = React.useState(null);
    const [streetName, setStreetName] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [city, setCity] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [availableTo, setAvailableTo] = React.useState("male");
    const [name, setName] = React.useState('');
    const [pictures, setPictures] = React.useState(null);
    const [deposit, setDeposit] = React.useState('');
    const [type, setType] = React.useState("flat");
    const [description, setDescription] = React.useState('');
    const [rent, setRent] = React.useState('');
    const [area, setArea] = React.useState('');
    const [rooms, setRooms] = React.useState('');
    const handleSubmit = async e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            const requestBody = createListing();
            console.log(requestBody);
            try {
                const response = await api.post('/listings', requestBody);
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const createListing = () => {
        setAddress(addressCreator(streetName, houseNumber, city, postalCode, "Switzerland"));
        console.log(address);

        // TODO: add image upload handling

        return new Listing({
            name,
            address,
            availableTo,
            pictures: null,
            published: true,
            publisher: localStorage.getItem("user").uuid,
            deposit,
            listing_type: type,
            description,
            rent,
            sqm: area,
            rooms,
            furnished: false
        });
    };

    // TODO: add more validation to the form like (character limit, number of rooms, etc)

    return (
        <Container className="d-flex justify-content-center">
            <Card className="menu-card">
                <Card.Header className="d-flex justify-content-around" style={{backgroundColor: "#708AFF"}}>
                    <div className="header-group">
                        <img src="https://via.placeholder.com/500x300.png?text=Flat" alt="profile"
                             className="listing-header-image"
                             height="350"/>
                        <input type="file" name="edit-image" id="image-file" className="header-file-input"
                               onChange={e => (setPictures(e.target.value))}/>
                        <label htmlFor="image-file">
                            <span style={{marginRight: "10px"}}>Edit Image</span>
                            <FontAwesomeIcon icon={faEdit} className="header-edit-icon"/>
                        </label>
                    </div>
                    <div className="header-group">
                        <img src="https://via.placeholder.com/500x300.png?text=Floorplan" alt="profile"
                             className="listing-header-image"
                             height="350"/>
                        <input type="file" name="edit-floorplan" id="floorplan-file" className="header-file-input"/>
                        <label htmlFor="floorplan-file">
                            <span style={{marginRight: "10px"}}>Edit Floorplan</span>
                            <FontAwesomeIcon icon={faEdit} className="header-edit-icon"/>
                        </label>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Street Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Rämistrasse" onChange={e => {
                                        setStreetName(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group>
                                    <Form.Label>House Nr.</Form.Label>
                                    <Form.Control required type="text" placeholder="87" onChange={e => {
                                        setHouseNumber(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control required type="text" placeholder="8008" onChange={e => {
                                        setPostalCode(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control required type="text" placeholder="Zurich" onChange={e => {
                                        setCity(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control required type="text" placeholder="150m²" onChange={e => {
                                        setArea(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Rooms</Form.Label>
                                    <Form.Control required type="text" placeholder="3.5" onChange={e => {
                                        setRooms(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Rent</Form.Label>
                                    <Form.Control required type="text" placeholder="CHF 1000" onChange={e => {
                                        setRent(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Deposit</Form.Label>
                                    <Form.Control required type="text" placeholder="5000" onChange={e => {
                                        setDeposit(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Available To</Form.Label>
                                    <Form.Select required onChange={e => (setAvailableTo(e.target.value))}>
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                        <option>OTHER</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select required onChange={e => (setType(e.target.value))}>
                                        <option>ROOM</option>
                                        <option>FLAT</option>
                                        <option>HOUSE</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Display name</Form.Label>
                                <Form.Control required type="text" placeholder="Example display name" onChange={e => {
                                    setName(e.target.value)
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control required as="textarea" rows="5"
                                              placeholder="Add a description of the flat here..."
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
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
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
