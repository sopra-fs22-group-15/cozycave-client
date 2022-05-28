import React, { useState, useContext } from "react";
import { Button, Card, Col, Form, Row, Spinner, Container, Stack, CloseButton } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import { useNavigate, useParams } from "react-router-dom";
import { addressStringBuilder } from "../../helpers/addressStringBuilder";
import { toast, ToastContainer } from 'react-toastify';
import { GatherContext } from "../../context/gather-context";

const GatherTogetherRequest = props => {
    const { user } = props;
    const gatherTogether = useContext(GatherContext);

    const requestAccepted = () => {
        gatherTogether.setShowRequest(null);
        gatherTogether.setSendRequest([true, user.id])
        console.log('done')
    }

    const requestDenied = () => {
        gatherTogether.setShowRequest(null);
        gatherTogether.setSendRequest([false, user.id])
    }

    return (
        <>
            {user ? (
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Container fluid={true} style={{ maxWidth: '75%', marginTop: '5rem' }}>
                        <Stack direction='horizontal'>
                            <h5>{user.details.first_name} {user.details.last_name} has requested to see your contact details:</h5>
                            <Button className='ms-auto' variant='success' 
                            onClick={() => requestAccepted()}>Accept</Button>
                            <Button variant='danger' onClick={() => requestDenied()}>Deny</Button>
                        </Stack>
                        <Card.Header className="d-flex justify-content-center" style={{ backgroundColor: "#708AFF" }}>
                            <Row>
                                <Col className="d-flex flex-column align-items-center ">
                                    <img src="https://www.placecage.com/c/300/300" alt="profile"
                                        className="rounded-circle profile-avatar"
                                        height="150" />
                                    <h1 style={{ color: "white" }}>{user.details.last_name || user.details.first_name ?
                                        `${user.details.first_name + " " + user.details.last_name}` : "John Doe"}</h1>
                                    <h4 style={{ color: "white"}}>Gender: {user.details.gender}</h4>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>Biography:</Form.Label>
                                        <Form.Control as="textarea" rows="10" placeholder={user.details.biography} disabled />
                                    </Form.Group>
                                </Row>
                            </Form>
                            <Card.Footer>
                                <ToastContainer />
                            </Card.Footer>
                        </Card.Body>
                    </Container>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50rem" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )

            }
        </>
    )
}

export default GatherTogetherRequest;