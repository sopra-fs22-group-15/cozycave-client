import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react';
import {api, handleError} from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
function RegisterForm(props) {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const address = new Address()
    const gender = new Gender()
    const handleRegister = () => {

    }

    const checkPassword = (password) => {
        
    }

    return (
        <div>
            <Modal show={props.registerOpen} onHide={props.hideRegister}>
                <Form fluid style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 30 }}>
                    <Row className='g-2' style={{ paddingBottom: 10 }}>
                        <Col md>
                            <FormLabel controlId="firstNameInput">First Name</FormLabel>
                            <Form.Control type="firstName" placeholder="Jane" onChange={e => setFirstName(e.target.value)}/>

                        </Col>
                        <Col md>
                            <FormLabel controlId="lastNameInput" label="Last Name">Last Name</FormLabel>
                            <Form.Control type="lastName" placeholder="Doe" onChange={e => setLastName(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='g-2'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="email" placeholder="jane.doe@gmail.com" onChange={e => setEmail(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>

                    </Row>

                    <Row className='g-2'>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                                </InputGroup>
                            </Form.Group>
                    </Row>

                    <Row className='g-2'>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                                </InputGroup>
                            </Form.Group>
                    </Row>

                    <Row className='g-2'>
                        <Col md>
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control type="streetName" placeholder="Irchelstrasse" />
                        </Col>
                        <Col md>
                            <Form.Label>House Number</Form.Label>
                            <Form.Control type="houseNr" placeholder="10" />
                        </Col>
                    </Row>

                    <Row className='g-2'>
                        <Col md>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="city" placeholder="Zurich" />
                        </Col>
                        <Col md>
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control type="postcode" placeholder="8000" />
                        </Col>
                    </Row>

                    <Row className='g-2' style={{ paddingTop: 30 }}>
                        <Col>
                            <Form.Select>
                                <option>Select your gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                                <option value="3">Prefer not to answer</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form>
                <Button variant="primary" onClick={() => handleRegister()} >Register</Button>
            </Modal>
        </div>
    )

}

export default RegisterForm;