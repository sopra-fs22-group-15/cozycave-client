import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {api} from "../../helpers/api";
import {addressCreator} from "../util/addressCreator";
import Listing from "../schemas/Listing";
import {mockListings} from "../util/mockListings";
import {useParams} from "react-router-dom";
import "../../styles/EditListing.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";

const EditListing = () => {

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);

    // TODO: change when backend is ready

    const [currentListing, setCurrentListing] = useState(mockListings[0]);

    const [address, setAddress] = useState(null);
    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [availableTo, setAvailableTo] = useState("male");
    const [name, setName] = useState('');
    const [pictures, setPictures] = useState(null);
    const [deposit, setDeposit] = useState('');
    const [type, setType] = useState("flat");
    const [description, setDescription] = useState('');
    const [rent, setRent] = useState('');
    const [area, setArea] = useState('');
    const [rooms, setRooms] = useState('');

    const {id} = useParams();

    const getListing = async () => {
        try {
            // TODO: get listing by id when backend is ready
            // const response = await api.get(`/listings/${window.location.pathname.split('/')[2]}`);
            // setCurrentListing(response.data);
            setCurrentListing(mockListings[0]);
            setAddress(addressCreator(currentListing.address));
            setStreetName(currentListing.address.streetName);
            setHouseNumber(currentListing.address.house_number);
            setCity(currentListing.address.city);
            setPostalCode(currentListing.address.zip_code);
            setAvailableTo(currentListing.availableTo);
            setName(currentListing.name);
            setPictures(currentListing.pictures);
            setDeposit(currentListing.deposit);
            setType(currentListing.type);
            setDescription(currentListing.description);
            setRent(currentListing.rent);
            setArea(currentListing.area);
            setRooms(currentListing.rooms);
            setPictures(currentListing.pictures);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteImage = (url) => {
        const newPictures = currentListing.picture.url.filter(picture => picture !== url);
        setPictures(newPictures);
    }

    const handleEdit = async e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            const requestBody = createListing();
            console.log(requestBody);
            try {
                const response = await api.put(`/listings/${currentListing.uuid}`, requestBody);
                setCurrentListing(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const createListing = () => {
        setAddress(addressCreator(streetName, houseNumber, city, postalCode));
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

    useEffect(() => {
        getListing().then(() => setLoading(false));
    }, []);
    return (
        <>
            {!loading && !currentListing ? (
                <Container className="d-flex justify-content-center">
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                </Container>
            ) : (
                <Container className="d-flex justify-content-center">
                    <Card className="menu-card">
                        <Card.Header style={{backgroundColor: "#ffffff"}}>
                            <Row>
                                <Col>
                                    <h4>{"Editing listing: "}
                                        <span style={{color: "#8b8b8b"}}>
                                            {currentListing.name}
                                        </span>
                                    </h4>
                                </Col>
                            </Row>
                            <div className="row">
                                <div className="col-md">
                                    <div className="row no-gutters">
                                        {currentListing.picture.url.map((url, index) => {
                                            return (
                                                <div className="col-sm-4 edit-listing-container" key={index}>
                                                    <img src={url} className="edit-listing-image" alt="listing_image"/>
                                                    <Button key={index} variant="danger" size="sm"
                                                            className="edit-listing-button"
                                                            onClick={() => {
                                                                handleDeleteImage(url)
                                                            }}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Button>
                                                </div>)
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleEdit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Street Name</Form.Label>
                                            <Form.Control required type="text"
                                                          placeholder={currentListing.address.street} onChange={e => {
                                                setStreetName(e.target.value)
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group>
                                            <Form.Label>House Nr.</Form.Label>
                                            <Form.Control required type="text"
                                                          placeholder={`${currentListing.address.house_number}`}
                                                          onChange={e => {
                                                              setHouseNumber(e.target.value)
                                                          }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control required type="text"
                                                          placeholder={currentListing.address.zip_code} onChange={e => {
                                                setPostalCode(e.target.value)
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control required type="text" placeholder={currentListing.address.city}
                                                          onChange={e => {
                                                              setCity(e.target.value)
                                                          }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Area</Form.Label>
                                            <Form.Control required type="text" placeholder={currentListing.sqm}
                                                          onChange={e => {
                                                              setArea(e.target.value)
                                                          }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Rooms</Form.Label>
                                            <Form.Control required type="text" placeholder={currentListing.rooms}
                                                          onChange={e => {
                                                              setRooms(e.target.value)
                                                          }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Rent</Form.Label>
                                            <Form.Control required type="text" placeholder={currentListing.rent}
                                                          onChange={e => {
                                                              setRent(e.target.value)
                                                          }}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Deposit</Form.Label>
                                            <Form.Control required type="text" placeholder={`${currentListing.deposit}`}
                                                          onChange={e => {
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
                                        <Form.Control required type="text" placeholder={currentListing.name}
                                                      onChange={e => {
                                                          setName(e.target.value)
                                                      }}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control required as="textarea" rows="5"
                                                      placeholder={currentListing.description}
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
                                    <Button variant="primary" type="submit" onClick={handleEdit}>
                                        <span style={{marginRight: "10px"}}>Save Changes</span>
                                        <FontAwesomeIcon icon={faSave}/>
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Container>
            )}
        </>
    )
}

export default EditListing;