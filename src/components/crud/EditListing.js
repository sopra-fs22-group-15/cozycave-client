import React, {useContext, useEffect, useState} from "react";
import {Badge, Button, Card, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import {api} from "../../helpers/api";
import {useParams} from "react-router-dom";
import "../../styles/EditListing.scss";
import "../../styles/CreateAd.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/auth-context";

const EditListing = props => {


    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);

    const auth = useContext(AuthContext);
    const user = auth.user;


    // TODO: change when backend is ready

    const [currentListing, setCurrentListing] = useState(null);


    // const [address, setAddress] = useState(null);
    const [streetName, setStreetName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [availableTo, setAvailableTo] = useState(['MALE']);
    const [name, setName] = useState('');
    const [pictures, setPictures] = useState(null);
    const [deposit, setDeposit] = useState('');
    const [state, setState] = useState('')
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [rent, setRent] = useState('');
    const [area, setArea] = useState('');
    const [rooms, setRooms] = useState('');

    const {id} = useParams();

    const getListing = async () => {

        try {
            // TODO: get listing by id when backend is ready
            if (auth.isLoggedIn && auth.user) {
                const response = await api.get(`/listings/${id}`);
                setCurrentListing(response.data);
                setAvailableTo(currentListing.available_to);
                setName(currentListing.title);
                setPictures(currentListing.pictures);
                setDeposit(currentListing.deposit);
                setType(currentListing.listing_type);
                setDescription(currentListing.description);
                setRent(currentListing.rent);
                setArea(currentListing.area);
                setRooms(currentListing.rooms);
                setPictures(currentListing.pictures);
                setLoading(false);
            }

            console.log(currentListing);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteImage = (url) => {
        const newPictures = currentListing.pictures.picture_url.filter(picture => picture !== url);
        setPictures(newPictures);
    }

    const defaultValues = {
        MALE: false,
        FEMALE: false,
        OTHER: false
    }


    // console.log({...arrayToStateMapper, ...defaultValues})


    const [availableToChecked, setAvailableToChecked] = useState(defaultValues);
    // console.log("initialState:", initialState);
    // console.log("availableTO",  availableToChecked);


    const onChangeFemale = e => {
        setAvailableToChecked(prevState => ({
            ...prevState,
            FEMALE: !availableToChecked.FEMALE,
        }));
    }

    const onChangeMale = e => {
        setAvailableToChecked(prevState => ({
            ...prevState,
            MALE: !availableToChecked.MALE,
        }));
    }

    const onChangeOther = e => {
        setAvailableToChecked(prevState => ({
            ...prevState,
            OTHER: !availableToChecked.OTHER,
        }));
    }


    const handleEdit = async e => {
        setLoading(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            const requestBody = createListing();
            console.log(requestBody);
            try {
                const response = await api.put(`/listings/${currentListing.id}`, requestBody);
                setCurrentListing(response.data);
            } catch (e) {
                console.log(e);
            }
            setLoading(false)
            getListing();
            // window.location.reload();
        }
    };

    const handleChange = e => {
        const {name, value} = e.target;
        if (name === 'postalCode') {
            setPostalCode(value);
        } else if (name === 'availableTo') {
            setAvailableToChecked(value);
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
    }

    const createListing = () => {
        // setAddress(addressCreator(streetName, houseNumber, city, postalCode, state));

        // TODO: add image upload handling
        let checkGender = [];
        for (let key in availableToChecked) {
            if (availableToChecked[key]) {
                checkGender.push(key);
            }
        }
        let checkData = [];
        for (let i = 0; i < checkGender.length; i++) {
            checkData.push(checkGender[i]);
        }
        console.log(checkData);

        return {
            title: name ? name : currentListing.title,
            available_to: currentListing.available_to,
            pictures: currentListing.pictures,
            published: true,
            deposit: deposit ? deposit : currentListing.deposit,
            listing_type: type ? type : currentListing.listing_type,
            description: description ? description : currentListing.description,
            floorplan: [],
            rent: rent ? rent : currentListing.rent,
            sqm: area ? area : currentListing.sqm,
            rooms: rooms ? rooms : currentListing.rooms,
            furnished: false
        }
    };


    useEffect(() => {
        getListing().then(() => {
            setLoading(false);
        });
        props.getUser();
    }, []);
    return (
        <>
            {currentListing && !loading ? (
                <Container className="d-flex justify-content-center">
                    <Card className="menu-card">
                        <Row style={{paddingLeft: "10px", paddingTop: "10px"}}>
                            <Col>
                                <h4>{"Editing listing: "}
                                    <span style={{color: "#8b8b8b"}}>
                                            {currentListing.title}
                                        </span>
                                </h4>
                            </Col>
                        </Row>
                        <Card.Header className="edit-listing-header" style={{backgroundColor: "#ffffff"}}>


                            {currentListing.pictures ? (<Row className="edit-listing-container">
                                <Card.Img variant="top" src={currentListing.pictures[0].picture_url}/>
                            </Row>) : (
                                <div className="center-middle">
                                    <Spinner animation="border" variant="primary"/>
                                </div>
                            )}
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleEdit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Street Name</Form.Label>
                                            <Form.Control type="text"
                                                          disabled
                                                          placeholder={currentListing.address.street}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Group>
                                            <Form.Label>House Nr.</Form.Label>
                                            <Form.Control type="text"
                                                          disabled
                                                          placeholder={`${currentListing.address.house_number}`}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control type="text" disabled
                                                          placeholder={currentListing.address.zip_code} onChange={e => {
                                                setPostalCode(e.target.value)
                                            }}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder={currentListing.address.city}
                                                          disabled
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
                                            <Form.Control type="text"
                                                          name="area"
                                                          placeholder={currentListing.sqm + " m²"}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Rooms</Form.Label>
                                            <Form.Control type="text"
                                                          name="rooms"
                                                          placeholder={currentListing.rooms}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Rent</Form.Label>
                                            <Form.Control type="text"
                                                          name="rent"
                                                          placeholder={"CHF " + currentListing.rent}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Deposit</Form.Label>
                                            <Form.Control type="text"
                                                          name="deposit"
                                                          placeholder={`CHF ${currentListing.deposit}`}
                                                          onChange={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label className="d-flex">Available To:
                                                {/*<div>*/}
                                                {/*    <Badge style={{marginLeft: "10px"}} variant="secondary">M</Badge>*/}
                                                {/*    <Badge style={{marginLeft: "10px"}} variant="secondary">F</Badge>*/}
                                                {/*    <Badge style={{marginLeft: "10px"}} variant="secondary">O</Badge>*/}
                                                {/*</div>*/}
                                            </Form.Label>
                                            <Dropdown autoClose="outside" className="dropdown-container">
                                                <Dropdown.Toggle className="gender-checkbox-dropdown" disabled
                                                                 id="dropdown-autoclose-inside">
                                                    {availableTo ? availableTo.map((item, index) => {
                                                        return (
                                                            <Badge style={{marginLeft: "10px"}}
                                                                   pill
                                                                   variant="secondary"
                                                                   key={index}>{item}</Badge>
                                                        )
                                                    }) : null}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{width: "240px"}}>
                                                    <Row>
                                                        <Col>
                                                            <div style={{paddingLeft: "10px"}}>
                                                                <Form.Check
                                                                    name="male"
                                                                    label="Male"
                                                                    onChange={onChangeMale}
                                                                    id={`checkbox-male`}/>
                                                                <Form.Check
                                                                    name="female"
                                                                    label="Female"
                                                                    onChange={onChangeFemale}
                                                                    id={`checkbox-female`}/>
                                                                <Form.Check
                                                                    name="other"
                                                                    label="Other"
                                                                    onChange={onChangeOther}
                                                                    id={`checkbox-other`}/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select name="type" onChange={handleChange}>
                                                <option defaultValue={currentListing.listing_type}>{currentListing.listing_type[0] + currentListing.listing_type.slice(1,).toLowerCase()}</option>
                                                <option value="ROOM">Room</option>
                                                <option value="FLAT">Flat</option>
                                                <option value="HOUSE">House</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Display name</Form.Label>
                                        <Form.Control type="text" placeholder={currentListing.title}
                                                      onChange={e => {
                                                          setName(e.target.value)
                                                      }}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows="5"
                                                      name="description"
                                                      placeholder={currentListing.description}
                                                      onChange={handleChange}/>
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
            ) : (
                <div className="center-middle">
                    <Spinner animation="border" variant="primary"/>
                </div>
            )}
        </>
    )
}

export default EditListing;