import React, {useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {api} from "../../helpers/api";

const ProfileDetails = props => {

    const user = props.user;

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastName] = useState(user.lastname);
    const [gender, setGender] = useState(user.gender);
    const [bio, setBio] = useState(user.bio);
    const [loading, setLoading] = useState(false);


    const saveChanges = async () => {
        try {
            const requestBody = JSON.stringify({gender, firstname: firstname, lastname: lastname, bio})
            console.log(requestBody)
            const response = await api.put(`users/${user.id}`, requestBody)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    // TODO: add validation
    // TODO: complete implementation with backend
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
                        <h1 style={{color: "white"}}>{lastname || firstname ? `${firstname + " " + lastname}` : "John Doe"}</h1>
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
                                <Form.Control type="text" placeholder="John" onChange={e => {
                                    setFirstname(e.target.value)
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="John" onChange={e => {
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
                                    <option>Male</option>
                                    <option value="1">Female</option>
                                    <option value="2">Other</option>
                                    <option value="3">Prefer not to tell</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Occupation</Form.Label>
                            <Form.Select type="text" value="1" placeholder="Student" onChange={() => {alert("To change your account type please create a new account.")}}>
                                <option value="1">Student</option>
                                <option value="2">Landlord</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
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