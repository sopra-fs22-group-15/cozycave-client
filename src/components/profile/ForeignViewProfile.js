import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import { addressStringBuilder } from "../../helpers/addressStringBuilder";

const ForeignViewProfile = props => {

    const user = props.user;
    const [phoneNumber, setPhoneNumber] = useState(user.details.phone_number);

    return (
        <>
            <Card.Header className="d-flex justify-content-center" style={{ backgroundColor: "#708AFF" }}>
                <Row>
                    <Col className="d-flex flex-column align-items-center ">
                        <img src="https://www.placecage.com/c/300/300" alt="profile"
                            className="rounded-circle profile-avatar"
                            height="150" />
                        <h1 style={{ color: "white" }}>{user.details.lastName || user.details.firstName ?
                            `${user.details.firstName + " " + user.details.lastName}` : "John Doe"}</h1>
                        <h5 style={{ color: "white" }}>{`${user.email ? user.email : "john.doe@uzh.ch"}`}</h5>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder={user.details.first_name} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder={user.details.last_name} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label={user.details.gender} disabled>
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
                                    placeholder={user.details.phone_number ?
                                        user.details.phone_number : "No phone number yet"}
                                    disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Occupation</Form.Label>
                            <Form.Select type="text" placeholder={user.role} disabled>
                                <option value="1">Student</option>
                                <option value="2">Landlord</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Form.Group>
                            <Form.Label>1st Address</Form.Label>
                            <Form.Control type="text" placeholder={addressStringBuilder(user.details.address)} disabled />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>2nd Address</Form.Label>
                            <Form.Control type="text" placeholder="Add a second address" disabled />
                        </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Form.Group>
                            <Form.Label>Biography</Form.Label>
                            <Form.Control as="textarea" rows="10" placeholder={user.details.biography} disabled />
                        </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
        </>
    )
}

export default ForeignViewProfile;