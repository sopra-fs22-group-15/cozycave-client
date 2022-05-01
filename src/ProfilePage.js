import React, { useState} from 'react';
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles/ProfilePage.scss";
import {api} from "./helpers/api";

const ProfilePage = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [birthdate, setBirthdate] = useState(localStorage.getItem('birthdate'));
    const [gender, setGender] = useState(localStorage.getItem('gender'));
    const [bio, setBio] = useState(localStorage.getItem('biography'));
    const [loading, setLoading] = useState(true);

    const saveChanges = async (e) => {
        try {
            const requestBody = JSON.stringify(...{username, birthdate, gender})
            const response = await api.put(`users/${localStorage.getItem('uuid')}`, requestBody)
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

    let profileDetails = (<>
        <Card.Header className="d-flex justify-content-center" style={{backgroundColor: "#708AFF"}}>
            <Row>
                <Col className="d-flex flex-column align-items-center ">
                    <img src="https://www.placecage.com/c/300/300" alt="profile"
                         className="rounded-circle profile-avatar"
                         height="150"/>
                    <h1 style={{color: "white"}}>John Doe</h1>
                    <h5 style={{color: "white"}}>johnthedoe</h5>
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={saveChanges}>
                <Row>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="johnthedoe" onChange={e => {
                            setUsername(e.target.value)
                        }}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="date" placeholder="Birthdate" onChange={e => {
                                setBirthdate(e.target.value)
                            }}/>
                        </Form.Group>
                    </Col>
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
                        <Form.Select type="text" placeholder="Student">
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
    </>);

    return (
        <Container className="d-flex justify-content-center">
            <Card className="profile-card">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Profile Details">
                        {profileDetails}
                    </Tab>
                    <Tab eventKey="applications" title="My Applications">

                    </Tab>
                    <Tab eventKey="listings" title="My Listings">

                    </Tab>
                </Tabs>

            </Card>
        </Container>
    );
};

export default ProfilePage;