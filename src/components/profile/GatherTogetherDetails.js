import React, { useState, useContext } from "react";
import { Button, Card, Col, Form, Row, Spinner, Container, Stack, CloseButton, Modal } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { GatherContext } from "../../context/gather-context";

const GatherTogetherDetails = props => {
    const { user } = props;
    const gatherTogether = useContext(GatherContext);

    return (
        <Modal show={gatherTogether.showDetails} size='lg' onHide={() => gatherTogether.setShowDetails(null)}>
            {user ? (
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Your details request for {user.details.first_name} {user.details.last_name} was approved:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card.Header className="d-flex justify-content-center" style={{ backgroundColor: "#90EE90" }}>
                            <Row>

                                <Col className="d-flex flex-column align-items-center ">
                                    <img src="https://www.placecage.com/c/300/300" alt="profile"
                                        className="rounded-circle profile-avatar"
                                        height="150" />
                                    <h1 style={{ color: "white" }}>{user.details.last_name || user.details.first_name ?
                                        `${user.details.first_name + " " + user.details.last_name}` : "John Doe"}</h1>
                                    <h5 style={{ color: "white" }}>{`${user.authentication.email ?
                                        user.authentication.email : "john.doe@uzh.ch"}`}</h5>
                                </Col>


                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control type="text"
                                                placeholder={user.details.gender}
                                                disabled />
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
                                <hr />
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Biography</Form.Label>
                                        <Form.Control as="textarea" rows="10" placeholder={user.details.biography} disabled />
                                    </Form.Group>
                                </Row>
                            </Form>
                            <Card.Footer>
                                <ToastContainer />
                            </Card.Footer>
                        </Card.Body>
                    </Modal.Body>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50rem" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )

            }
        </Modal>
    )
}

export default GatherTogetherDetails;