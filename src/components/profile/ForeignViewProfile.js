import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import { useNavigate, useParams } from "react-router-dom";
import { addressStringBuilder } from "../../helpers/addressStringBuilder";
import { api, handleError } from "../../helpers/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from 'react-toastify';

const ForeignViewProfile = props => {
    let user;
    const id=useParams();
    const navigate=useNavigate();
    const openAsOwnPage = props.openAsOwnPage;
    if(openAsOwnPage===true){
        getUser(id)
    }else{
        user=props.user
    }

    const getUser = async (id) => {
        try {
            let response = await api.get(`/users/${id}`);
            return(JSON.parse(response.data))
        } catch (error) {
            alert(`${handleError(error)}`);
        }
    }

    const renderDeleteButton = () => { //this is only rendered for admin
        console.log()
        if(JSON.parse(localStorage.getItem('user')).role==="ADMIN" && user.role!=="ADMIN"){
            return (<Row>
                <Col className="d-flex justify-content-center align-content-center">
                    <Button variant="danger" onClick={deleteUser}>
                        <span style={{marginRight: "10px"}}>Delete User</span>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </Col>
            </Row>)
        }
    }

    const deleteUser = async () => { //only available to admin
        try {
            let response = await api.delete(`/users/${user.id}`);
            window.location.reload(false); //TODO: add nicer reload
            toast.success("Successfully deleted user");

        } catch (error) {
            alert(`Could not delete user: \n${handleError(error)}`);
        }
    }

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
                                <Form.Select aria-label="MALE" disabled>
                                    <option>{user.details.gender}</option>
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
                                <option>{user.role}</option>
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
                <Card.Footer>
                    <ToastContainer/>
                    {renderDeleteButton()}
                </Card.Footer>
            </Card.Body>
        </>
    )
}

export default ForeignViewProfile;