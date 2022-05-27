import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import "../../styles/CreateAd.scss";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {api} from "../../helpers/api";
import {addressCreator} from "../util/addressCreator";
import ImageCarousel from "../listings/ImageCarousel";
import {useNavigate} from "react-router-dom";

const CreateAd = () => {

    //TODO: add authorization check, only display if user is signed in a seller

    const [validated, setValidated] = React.useState(false);

    const [address, setAddress] = React.useState(null);
    const [streetName, setStreetName] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState(null);
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('Switzerland');
    const [postalCode, setPostalCode] = React.useState('');
    const [availableTo, setAvailableTo] = React.useState("male");
    const [name, setName] = React.useState('');
    // const [floorplan, setFloorplan] = useState(null);
    const [pictures, setPictures] = React.useState([]);
    const [previewSrc, setPreviewSrc] = useState('');
    const [floorplanPreviewSrc, setFloorplanPreviewSrc] = React.useState('');
    const [deposit, setDeposit] = React.useState(null);
    const [type, setType] = React.useState("flat");
    const [description, setDescription] = React.useState('');
    const [rent, setRent] = React.useState(null);
    const [area, setArea] = React.useState(null);
    const [rooms, setRooms] = React.useState(null);

    const [files, setFiles] = React.useState();
    const [imageUrl, setImageUrl] = React.useState([]);

    const navigate = useNavigate();


    const handleSubmit = async e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(false)
            e.preventDefault();
            e.stopPropagation();
        } else {
            const requestBody = createListing();
            if(address && streetName && houseNumber && city && state && postalCode && deposit && rent && area && rooms && name && description){
                setValidated(true);
            }
            console.log(requestBody);
            if(validated){

                try {
                    const response = await api.post('/listings', requestBody);
                    toast.success("Listing created successfully! See your listings under the profile page. 🥳", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 7000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    navigate('/overview');
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 400) {
                        toast.error("Please fill out all required fields!", {position: toast.POSITION.TOP_CENTER});
                    } else {
                        toast.error("Error occurred when trying to create a listing.", {position: toast.POSITION.TOP_CENTER});
                    }
                }
            } else {
                toast.error("Please fill out all required fields!", {position: toast.POSITION.TOP_CENTER});
            }
        }

    };

    const handleImages = e => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            let file = files[i];
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (i === 0) {
                    setPreviewSrc(reader.result);
                }
                setImageUrl([...imageUrl, reader.result]);
                setFiles(file);
            };
        }
        console.log(files);
    };


    // TODO: add support for floorplan maybe?

    const handleFloorplan = () => {
        toast.warn("Floorplan not supported yet 😔");
    };

    const createListing = () => {
        setAddress(addressCreator(streetName, houseNumber, city, postalCode, state, country, name));
        console.log(address);

        // TODO: add image upload handling

        if (!address) {
            setValidated(false);
            toast.error("Please fill out all required fields!", {position: toast.POSITION.TOP_CENTER});
        }

        const currentUser = JSON.parse(localStorage.getItem('user'));
        return {
            title: name,
            address: addressCreator(streetName, houseNumber, city, postalCode, state, country, name),
            available_to: [availableTo],
            available: true,
            // TODO: send pictures when backend is ready
            // pictures: pictures,
            publisher_id: currentUser.id,
            published: false,
            deposit: parseFloat(deposit),
            listing_type: type,
            description,
            rent: parseFloat(rent),
            sqm: parseFloat(area),
            rooms: parseFloat(rooms),
            furnished: false
        }
    };

    // TODO: add more validation to the form like (character limit, number of rooms, etc)

    return (
        <Container className="d-flex justify-content-center">
            <Card className="menu-card">
                <Card.Header className="d-flex justify-content-around" style={{backgroundColor: "#708AFF"}}>
                    <div className="header-group">
                        {files.length > 0 ? (
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
                                    <Form.Control required type="text" placeholder="8050" onChange={e => {
                                        setPostalCode(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control required type="text" placeholder="Oerlikon" onChange={e => {
                                        setCity(e.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control required type="text" placeholder="Zurich" onChange={e => {
                                        setState(e.target.value)
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
            <ToastContainer/>
        </Container>
    );
};

export default CreateAd;
