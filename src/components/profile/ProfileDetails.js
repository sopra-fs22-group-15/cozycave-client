import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import {api} from "../../helpers/api";
import 'react-phone-number-input/style.css'
import {addressStringBuilder} from "../../helpers/addressStringBuilder";
import "../../styles/ProfilePage.scss";
import {getGenderOptions} from "../util/getGenderOptions";


const ProfileDetails = props => {

    const user = props.user;

    const [firstName, setFirstName] = useState(user.details.first_name);
    const [lastName, setLastName] = useState(user.details.last_name);
    const [phoneNumber, setPhoneNumber] = useState(user.details.phone_number);
    const [gender, setGender] = useState(user.details.gender);
    const [bio, setBio] = useState(user.details.biography);
    const [address, setAddress] = useState(user.details.address)
    const [loading, setLoading] = useState(false);

    const [previewSrc, setPreviewSrc] = useState(null);
    const [file, setFile] = useState();

    const saveChanges = async () => {
        if (file) {
            setLoading(true);
            setPreviewSrc(null);
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await api.post(`/pictures/users`, formData);
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
                    birthday: "1950-05-14T02:41:20.182+00:00",
                    address: address,
                    biography: bio,
                    phone_number: phoneNumber,
                }
            })
            const response = await api.put(`users/${user.id}`, requestBody)
            setLoading(false);
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


    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: "50rem"}}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            ) : (
                <>
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
                                            <option value={user.details.gender}>{user.details.gender}</option>
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
                                    <Form.Label>Occupation</Form.Label>
                                    <Form.Select type="text" value={user.role === "STUDENT" ? 1 : 2}
                                                 onChange={() => {
                                                     alert("To change your account type please create a new account.")
                                                 }}>
                                        <option value="1">Student</option>
                                        <option value="2">Landlord</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <Row>
                                <Form.Group>
                                    <Form.Label>1st Address</Form.Label>
                                    <Form.Control disabled value={addressStringBuilder(address)} type="text"
                                                  placeholder={addressStringBuilder(user.details.address)}
                                                  onChange={e => {
                                                      setAddress(e.target.value)
                                                  }}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>2nd Address</Form.Label>
                                    <Form.Control type="text" placeholder="Add a second address" onChange={e => {
                                        setAddress(e.target.value)
                                    }}/>
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