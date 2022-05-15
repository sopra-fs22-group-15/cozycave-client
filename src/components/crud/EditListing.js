import React, {useEffect} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {api} from "../../helpers/api";
import {addressCreator} from "../util/addressCreator";
import Listing from "../schemas/Listing";
import {mockListings} from "../util/mockListings";
import {useParams} from "react-router-dom";

const EditListing = () => {

    const [validated, setValidated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    // TODO: change when backend is ready

    const [currentListing, setCurrentListing] = React.useState(mockListings[0]);

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
                            <div className="row">
                                <div className="col-md">
                                    <div className="row no-gutters">
                                        {currentListing.picture.url.map((url, index) => {
                                            return (
                                                <div className="col-sm-4" key={index}>
                                                    <img src={url} className={'img-fluid'}/>
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
                                                          placeholder={currentListing.address.house_number}
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
                                            <Form.Control required type="text" placeholder={currentListing.deposit}
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
                                        <Form.Control required type="text" placeholder="Example display name"
                                                      onChange={e => {
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
                                    <Button variant="primary" type="submit" onClick={handleEdit}>
                                        <span>Save Changes</span>
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