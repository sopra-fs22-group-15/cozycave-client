import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import "../../styles/CreateAd.scss";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {api} from "../../helpers/api";
import {addressCreator} from "../util/addressCreator";
import ImageCarousel from "../listings/ImageCarousel";
import {useNavigate} from "react-router-dom";

const CreateAd = props => {


        //TODO: add authorization check, only display if user is signed in a seller


        const {requestResults} = props;

        const user = JSON.parse(localStorage.getItem('user'));

        const [validated, setValidated] = React.useState(false);

        const [address, setAddress] = React.useState(null);
        const [streetName, setStreetName] = React.useState('');
        const [houseNumber, setHouseNumber] = React.useState("");
        const [city, setCity] = React.useState('');
        const [state, setState] = React.useState('');
        const [country, setCountry] = React.useState('Switzerland');
        const [postalCode, setPostalCode] = React.useState('');
        const [availableTo, setAvailableTo] = React.useState("MALE");
        const [name, setName] = React.useState('');
        // const [floorplan, setFloorplan] = useState(null);
        const [pictures, setPictures] = React.useState([]);
        const [previewSrc, setPreviewSrc] = useState("");
        const [floorplanPreviewSrc, setFloorplanPreviewSrc] = React.useState('');
        const [deposit, setDeposit] = React.useState("");
        const [type, setType] = React.useState("ROOM");
        const [description, setDescription] = React.useState('');
        const [rent, setRent] = React.useState("");
        const [area, setArea] = React.useState("");
        const [rooms, setRooms] = React.useState("");

        const [files, setFiles] = React.useState([]);
        const [imageUrl, setImageUrl] = React.useState([]);

        const [loading, setLoading] = React.useState(false);

        const navigate = useNavigate();

        const handleSubmit = async e => {
            setLoading(true);
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }

            setValidated(true);
            const requestBody = createListing();
            api.post('/listings', requestBody).then(response => {
                const formData = new FormData();
                formData.append('file', files[0]);
                api.post(`/pictures/listings/${response.data.id}`, formData).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    toast.error("Please fill out all required fields!", {position: toast.POSITION.TOP_CENTER});
                } else if (error.response.status >= 500) {
                    toast.error("Error occurred when trying to create a listing.", {position: toast.POSITION.TOP_CENTER});
                }
            });
            props.requestResults();
            setLoading(false);
            if (!loading && validated) {
                navigate(`/profile-page/${user.id}/listings`, props.requestResults());
            }
        };

        const handleChange = e => {
            const {name, value} = e.target;
            if (name === 'postalCode') {
                setPostalCode(value);
            } else if (name === 'availableTo') {
                setAvailableTo(value);
            } else if (name === 'name') {
                setName(value);
            } else if (name === 'deposit') {
                setDeposit(value);
            } else if (name === 'rent') {
                setRent(value);
            } else if (name === 'area') {
                setArea(value);
            } else if (name === 'rooms') {
                setRooms(value);
            } else if (name === 'description') {
                setDescription(value);
            } else if (name === 'streetName') {
                setStreetName(value);
            } else if (name === 'houseNumber') {
                setHouseNumber(value);
            } else if (name === 'city') {
                setCity(value);
            } else if (name === 'state') {
                setState(value);
            } else if (name === 'type') {
                setType(value);
            }
            if (streetName !== "" && houseNumber && files && type && city && state && postalCode && deposit && rent && area && rooms && name && description) {
                setValidated(true);
                console.log(validated);
            } else {
                setValidated(false);
                console.log(validated);
            }

        }

        const handleImages = e => {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (i === 0) {
                    setPreviewSrc(URL.createObjectURL(file));
                }
                setImageUrl([...imageUrl, URL.createObjectURL(file)]);
                setFiles([...files, file]);
            }
            console.log(files);
        };

// TODO: add support for floorplan maybe?

        const handleFloorplan = () => {
            toast.warn("Floorplan not supported yet 😔");
        };

        const createListing = () => {
            setAddress(addressCreator(streetName, houseNumber, city, postalCode, state, country, name));
            // TODO: add image upload handling

            const currentUser = JSON.parse(localStorage.getItem('user'));
            return {
                title: name,
                address: addressCreator(streetName, houseNumber, city, postalCode, state, country, name),
                available_to: [availableTo],
                available: true,
                // TODO: send pictures when backend is ready
                // pictures: pictures,
                publisher_id: currentUser.id,
                published: true,
                deposit: parseFloat(deposit),
                listing_type: type,
                description,
                rent: parseFloat(rent),
                sqm: parseFloat(area),
                rooms: parseFloat(rooms),
                furnished: false
            }
        };

        useEffect(() => {
            requestResults();
        }, [previewSrc, validated]);

// TODO: add more validation to the form like (character limit, number of rooms, etc)
        return (
            <Container className="d-flex justify-content-center">
                {loading ? (
                    <div className="center-middle">
                        <Spinner animation="border" variant="primary"/>
                    </div>
                ) : (
                    <Card className="menu-card">
                        <Card.Header className="d-flex justify-content-around" style={{backgroundColor: "#708AFF"}}>
                            <div className="header-group">
                                {files && files.length ? (
                                    <div className="listing-header-image">
                                        <ImageCarousel images={imageUrl} preview={previewSrc}/>
                                    </div>

                                ) : (
                                    <img src="https://via.placeholder.com/500x300.png?text=Flat"
                                         className="listing-header-image" alt="preview"/>
                                )}
                                <input type="file" multiple={true} name="edit-image" id="image-file"
                                       className="header-file-input"
                                       onChange={handleImages}/>
                                <label htmlFor="image-file">
                                    <span style={{marginRight: "10px"}}>Edit Image</span>
                                    <FontAwesomeIcon icon={faEdit} className="header-edit-icon"/>
                                </label>
                            </div>
                            <div className="header-group">
                                <img
                                    src={floorplanPreviewSrc === '' ? "https://via.placeholder.com/500x300.png?text=Floorplan" : floorplanPreviewSrc}
                                    className="listing-header-image"
                                    height="350" alt="Floorplan"/>
                                <input name="edit-floorplan" id="floorplan-file" className="header-file-input"
                                       onClick={handleFloorplan}/>
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
                                        <Form.Group controlId="validationCustom01">
                                            <Form.Label>Street Name</Form.Label>
                                            <Form.Control name="streetName" required type="text" placeholder="Rämistrasse"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group controlId="validationCustom02">
                                            <Form.Label>House Nr.</Form.Label>
                                            <Form.Control name="houseNumber" required type="text" placeholder="87"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="validationCustom03">
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control name="postalCode" required type="text" placeholder="8050"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom04">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control name="city" required type="text" placeholder="Oerlikon"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom05">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control name="state" required type="text" placeholder="Zurich"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="validationCustom06">
                                            <Form.Label>Area</Form.Label>
                                            <Form.Control name="area" required type="text" placeholder="150m²"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom07">
                                            <Form.Label>Rooms</Form.Label>
                                            <Form.Control name="rooms" required type="text" placeholder="3.5"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom08">
                                            <Form.Label>Rent</Form.Label>
                                            <Form.Control name="rent" required type="text" placeholder="CHF 1000"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="validationCustom09">
                                            <Form.Label>Deposit</Form.Label>
                                            <Form.Control name="deposit" required type="text" placeholder="5000"
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom10">
                                            <Form.Label>Available To</Form.Label>
                                            <Form.Select value={availableTo} name="availableTo" required
                                                         onChange={handleChange}>
                                                <option>MALE</option>
                                                <option>FEMALE</option>
                                                <option>OTHER</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="validationCustom11">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select value={type} name="type" required
                                                         onChange={e => (setType(e.target.value))}>
                                                <option>ROOM</option>
                                                <option>FLAT</option>
                                                <option>HOUSE</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group controlId="validationCustom12">
                                        <Form.Label>Display name</Form.Label>
                                        <Form.Control name="name" required type="text" placeholder="Example display name"
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group controlId="validationCustom13">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="description" required as="textarea" rows="5"
                                                      placeholder="Add a description of the flat here..."
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col className="d-flex justify-content-center align-content-center">
                                    <Button disabled={!validated} variant="primary" type="submit" onClick={handleSubmit}>
                                        <span>Create Listing</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                )}
                <ToastContainer/>
            </Container>
        );
    }
;

export default CreateAd;
