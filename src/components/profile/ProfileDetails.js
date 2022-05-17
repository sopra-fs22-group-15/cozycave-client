import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {api} from "../../helpers/api";
import 'react-phone-number-input/style.css'
import {addressStringBuilder} from "../../helpers/addressStringBuilder";

const ProfileDetails = props => {

    const user = props.user;

    const [firstName, setFirstName] = useState(user.details.first_name);
    const [lastName, setLastName] = useState(user.details.last_name);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState(user.details.gender);
    const [bio, setBio] = useState(user.details.biography);
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false);


    const saveChanges = async () => {
        try {
            const requestBody = JSON.stringify({
                id: user.id,
                details: {
                    gender,
                    first_name: firstName,
                    last_name: lastName,
                    biography: bio,
                    phone_number: phoneNumber
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

    return (
        <>
            <Card.Header className="d-flex justify-content-center" style={{backgroundColor: "#708AFF"}}>
                <Row>
                    <Col className="d-flex flex-column align-items-center ">
                        <img src="https://www.placecage.com/c/300/300" alt="profile"
                             className="rounded-circle profile-avatar"
                             height="150"/>
                        <h1 style={{color: "white"}}>{lastName || firstName ? `${firstName + " " + lastName}` : "John Doe"}</h1>
                        <h5 style={{color: "white"}}>{`${user.email ? user.email : "john.doe@uzh.ch"}`}</h5>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={saveChanges}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder={user.details.first_name} onChange={e => {
                                    setFirstName(e.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder={user.details.last_name} onChange={e => {
                                    setLastName(e.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="male" onChange={e => {
                                    setGender(e.target.value)
                                }}>
                                    <option>MALE</option>
                                    <option value="1">FEMALE</option>
                                    <option value="2">OTHER</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text"
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
                            <Form.Select type="text" value={user.role === "STUDENT" ? 1 : 2} placeholder="Student"
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
                            <Form.Control type="text" placeholder={addressStringBuilder(user.details.address)} onChange={e => {
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
                            <Form.Label>Biography</Form.Label>
                            <Form.Control as="textarea" rows="10" placeholder="Tell us about yourself"
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
    )
}

export default ProfileDetails;