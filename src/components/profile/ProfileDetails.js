import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, InputGroup, Modal, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import {api} from "../../helpers/api";
import 'react-phone-number-input/style.css'
import {addressStringBuilder} from "../../helpers/addressStringBuilder";
import "../../styles/ProfilePage.scss";
import {getGenderOptions} from "../util/getGenderOptions";
import moment from "moment";


const ProfileDetails = props => {

    const user = props.user;

    const [firstName, setFirstName] = useState(user.details.first_name);
    const [lastName, setLastName] = useState(user.details.last_name);
    const [phoneNumber, setPhoneNumber] = useState(user.details.phone_number);
    const [gender, setGender] = useState(user.details.gender);
    const [bio, setBio] = useState(user.details.biography);
    const [address, setAddress] = useState(user.details.address)

    const [specialAddress, setSpecialAddress] = useState(user.details.special_address[0] ? user.details.special_address[0] : {
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        house_number: '',
    });


    const [loading, setLoading] = useState(false);
    const [birthdate, setBirthdate] = useState(moment(user.details.birthday).format('YYYY-MM-DD'));

    const [street, setStreet] = useState(user.details.address.street);
    const [houseNr, setHouseNr] = useState(user.details.address.house_number);
    const [city, setCity] = useState(user.details.address.city);
    const [state, setState] = useState(user.details.address.state);
    const [zipCode, setZipCode] = useState(user.details.address.zip_code);
    const [country, setCountry] = useState(user.details.address.country);

    const [streetSpecial, setStreetSpecial] = useState(user.details.special_address.street);
    const [houseNrSpecial, setHouseNrSpecial] = useState(user.details.special_address.house_number);
    const [citySpecial, setCitySpecial] = useState(user.details.special_address.city);
    const [stateSpecial, setStateSpecial] = useState(user.details.special_address.state);
    const [zipCodeSpecial, setZipCodeSpecial] = useState(user.details.special_address.zip_code);
    const [countrySpecial, setCountrySpecial] = useState(user.details.special_address.country);


    const [show, setShow] = useState(false);
    const [showSpecialAddress, setShowSpecialAddress] = useState(false);

    const handleCloseSpecial = () => setShowSpecialAddress(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [previewSrc, setPreviewSrc] = useState(null);
    const [file, setFile] = useState();

    const handleNewAddress = () => {
        setAddress({
            street: street,
            house_number: houseNr,
            city: city,
            state: state,
            zip_code: zipCode,
            country: country
        })
        setShow(false);
    }

    const sendSpecialAddress = async () => {

        let specialAddress = {
            street: streetSpecial ? streetSpecial : specialAddress.street,
            house_number: houseNrSpecial ? houseNrSpecial : "",
            city: citySpecial ? citySpecial : "",
            state: stateSpecial ? stateSpecial : "",
            zip_code: zipCodeSpecial ? zipCodeSpecial : "",
            country: countrySpecial
        }
        // setLoading(true);

        if (user.details.special_address) {
            console.log(specialAddress);
            console.log(user.details.special_address);

            const response = await api.put(`/users/${user.id}/specialaddress/${user.details.special_address[0].id}`, specialAddress).then(res => {
                setSpecialAddress(res.data);
            }).catch(err => {
                console.log(err);
            });
        } else {
            const response = await api.post('/users/' + user.id + '/specialaddress', specialAddress).then(res => {
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
        props.getUser();
        window.location.reload();
        setLoading(false);
    }

    const saveChanges = async () => {
        if (file) {
            setLoading(true);
            setPreviewSrc(null);
            const formData = new FormData();
            formData.append('file', file);
            try {
                await api.post(`/pictures/users`, formData);
            } catch (e) {
                console.log(e);
            }
        }

        try {
            const requestBody = JSON.stringify({
                authentication: {
                    email: user.authentication.email,
                    token: user.token
                },
                details: {
                    first_name: firstName,
                    last_name: lastName,
                    gender,
                    birthday: birthdate,
                    address: {
                        street: street,
                        house_number: houseNr,
                        city: city,
                        state: state,
                        zip_code: zipCode,
                        country: country
                    },
                    biography: bio,
                    phone_number: phoneNumber,
                }
            })
            await api.put(`users/${user.id}`, requestBody)
            setLoading(false);
            window.location.reload();
            props.getUser();
        } catch (error) {
            console.log(error);
        }
    }
    // TODO: add validation
    // TODO: Add correct address handling when PUT request is fixed
    const submitForm = (e) => {
        e.preventDefault();
        saveChanges();
    }

    const handleImage = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        setFile(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        };
    };

    useEffect(() => {
        props.getUser();
    }, []);

    // console.log(address);
    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: "50rem"}}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            ) : (
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit 1st Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>Street Name*</Form.Label>
                                    <Form.Control type="streetName" placeholder={street}
                                                  onChange={(e) => setStreet(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>House Number*</Form.Label>
                                    <Form.Control type="houseNr" placeholder={houseNr}
                                                  onChange={(e) => setHouseNr(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control type="city" placeholder={city}
                                                  onChange={(e) => setCity(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Postcode*</Form.Label>
                                    <Form.Control type="zip_code" placeholder={zipCode}
                                                  onChange={(e) => setZipCode(e.target.value)}/>
                                </Col>
                            </Row>

                            {
                            }

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="state" placeholder={state}
                                                  onChange={(e) => setState(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="country" placeholder={country}
                                                  onChange={(e) => setCountry(e.target.value)}/>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleNewAddress}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSpecialAddress} onHide={handleCloseSpecial}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit 2nd Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>Street Name*</Form.Label>
                                    <Form.Control type="streetName"
                                                  placeholder={specialAddress.street ? specialAddress.street : ''}
                                                  onChange={(e) => {
                                                      setStreetSpecial(e.target.value)
                                                      console.log(streetSpecial);
                                                  }}/>
                                </Col>
                                <Col md>
                                    <Form.Label>House Number*</Form.Label>
                                    <Form.Control type="houseNr"
                                                  placeholder={specialAddress.house_number ? specialAddress.house_number : ''}
                                                  onChange={(e) => setHouseNrSpecial(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control type="city"
                                                  placeholder={specialAddress.city ? specialAddress.city : ''}
                                                  onChange={(e) => setCitySpecial(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Postcode*</Form.Label>
                                    <Form.Control type="zip_code"
                                                  placeholder={specialAddress.zip_code ? specialAddress.zip_code : ''}
                                                  onChange={(e) => setZipCodeSpecial(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="state"
                                                  placeholder={specialAddress.state ? specialAddress.state : ''}
                                                  onChange={(e) => setStateSpecial(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="country"
                                                  placeholder={specialAddress.country ? specialAddress.country : ''}
                                                  onChange={(e) => setCountrySpecial(e.target.value)}/>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={sendSpecialAddress}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Card.Header className="d-flex justify-content-center" style={{backgroundColor: "#708AFF"}}>
                        <Row>
                            <Col className="d-flex flex-column align-items-center ">
                                <div className="profile-container">
                                    <img src={previewSrc ? previewSrc : user.details.picture.picture_url} alt="profile"
                                         className="rounded-circle profile-avatar"
                                         height="150"/>
                                    <div className="profile-buttons">
                                        <input type="file" name="edit-profile-pic" id="profile-pic-file"
                                               className="profile-file-input" onChange={handleImage}/>
                                        <label htmlFor="profile-pic-file">
                                            <FontAwesomeIcon icon={faEdit} className="header-edit-icon"/>
                                        </label>
                                    </div>
                                </div>
                                <h1 style={{color: "white"}}>{lastName || firstName ? `${firstName + " " + lastName}` : "John Doe"}</h1>
                                <h5 style={{color: "white"}}>{`${user.authentication.email ?
                                    user.authentication.email : "john.doe@uzh.ch"}`}</h5>

                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={saveChanges}>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control value={firstName} type="text"
                                                      placeholder={user.details.first_name}
                                                      onChange={e => {
                                                          setFirstName(e.target.value)
                                                      }}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control value={lastName} type="text" placeholder={user.details.last_name}
                                                      onChange={e => {
                                                          setLastName(e.target.value)
                                                      }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="MALE" onChange={e => {
                                            setGender(e.target.value)
                                        }}>
                                            <option
                                                value={user.details.gender}>{user.details.gender[0] + user.details.gender.slice(1,).toLowerCase()}</option>
                                            {getGenderOptions(user.details.gender)}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control value={phoneNumber ? phoneNumber : "No phone number yet"}
                                                      type="text"
                                                      placeholder={phoneNumber ? phoneNumber : "No phone number yet"}
                                                      onChange={e => {
                                                          setPhoneNumber(e.target.value)
                                                      }}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Birthdate</Form.Label>
                                    <Form.Control value={birthdate} type="date" name="dob" placeholder="Date of Birth"
                                                  onChange={e => {
                                                      setBirthdate(e.target.value)
                                                  }}/>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <Row>
                                <Form.Label>1st Address</Form.Label>
                                <InputGroup>
                                    <Button variant="outline-secondary" id="button-addon1">
                                        <FontAwesomeIcon icon={faEdit} onClick={handleShow}/>
                                    </Button>
                                    <Form.Control disabled value={addressStringBuilder(address)} type="text"
                                                  placeholder={addressStringBuilder(user.details.address)}

                                    />
                                </InputGroup>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>2nd Address</Form.Label>
                                    <InputGroup>
                                        <Button variant="outline-secondary" id="button-addon1">
                                            <FontAwesomeIcon icon={faEdit} onClick={() => setShowSpecialAddress(true)}/>
                                        </Button>
                                        <Form.Control disabled
                                                      value={user.details.special_address ? addressStringBuilder(user.details.special_address[0]) : "No special address yet"}
                                                      type="text"
                                                      placeholder={user.details.special_address ? addressStringBuilder(user.details.special_address[0]) : "No special address yet"}

                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Describe yourself (this will be shown to listing owners if you
                                        apply):</Form.Label>
                                    <Form.Control value={bio} as="textarea" rows="7"
                                                  placeholder={user.details.biography}
                                                  onChange={e => {
                                                      setBio(e.target.value)
                                                  }}/>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col className="d-flex justify-content-center align-content-center">
                                <Button variant="primary" type="submit" onClick={submitForm}>
                                    <span style={{marginRight: "10px"}}>Save</span>
                                    <FontAwesomeIcon icon={faSave}/>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </>
            )}
        </>
    )
}

export default ProfileDetails;