import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react';
import {api, handleError} from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import { SHA3 } from 'sha3';

function RegisterForm(props) {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [streetName, setStreetName] = useState(null)
    const [houseNr, setHouseNr] = useState(null)
    const [city, setCity] = useState(null)
    const [postcode, setPostcode] = useState(null)
    const [genderState, setGenderState] = useState(null)
    const navigate = useNavigate();
    const requestRegister = async () => {
        try {
            const gender = new Gender();
            if(genderState==='Male'){
                gender.gender=Gender.Male;
            }else if(genderState==='Female'){
                gender.gender=Gender.Female;
            }else{
                gender.gender=Gender.Other;
            }
            const address = new Address();
            address.streetName=streetName;
            address.houseNr=houseNr;
            address.city=city;
            address.postcode=postcode;


            const password_hashed = new SHA3(512);
            password_hashed.update(password);
            const requestBody = JSON.stringify({ firstName, lastName, email, password_hashed, address, gender });
            const response = await api.post('/register/', requestBody);
      
            // Get the returned user and update a new object.
            const token = response.data;
      
            // Store the token into the local storage.
            localStorage.setItem('token', token, response.headers["authentication"]);
      
            // Login successfully worked --> navigate to the landing page in the AppRouter
            navigate(`/`);
          } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
          }
    }

    return (
        <div>
            <Modal show={props.registerOpen} onHide={props.hideRegister}>
                <Form fluid='true' style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 30 }}>
                    <Row className='g-2' style={{ paddingBottom: 10 }}>
                        <Col md>
                            <FormLabel controlId="firstNameInput">First Name</FormLabel>
                            <Form.Control type="firstName" placeholder="Jane" onChange={(e) => setFirstName(e.target.value)}/>

                        </Col>
                        <Col md>
                            <FormLabel controlId="lastNameInput" label="Last Name">Last Name</FormLabel>
                            <Form.Control type="lastName" placeholder="Doe" onChange={(e) => setLastName(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='g-2'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="email" placeholder="jane.doe@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>

                    </Row>

                    <Row className='g-2'>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                                </InputGroup>
                            </Form.Group>
                    </Row>

                    <Row className='g-2'>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputGroup>
                                <InputGroup.Text>Symbol</InputGroup.Text>
                                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </InputGroup>
                            </Form.Group>
                    </Row>

                    <Row className='g-2'>
                        <Col md>
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control type="streetName" placeholder="Irchelstrasse" onChange={(e) => setStreetName(e.target.value)}/>
                        </Col>
                        <Col md>
                            <Form.Label>House Number</Form.Label>
                            <Form.Control type="houseNr" placeholder="10" onChange={(e) => setHouseNr(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='g-2'>
                        <Col md>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="city" placeholder="Zurich" onChange={(e) => setCity(e.target.value)}/>
                        </Col>
                        <Col md>
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control type="postcode" placeholder="8000" onChange={(e) => setPostcode(e.target.value)}/>
                        </Col>
                    </Row>

                    <Row className='g-2' style={{ paddingTop: 30 }}>
                        <Col>
                            <Form.Select onChange={(e) => setGenderState(e.target.value)}>
                                <option selected disabled hidden>Select your gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                                <option>Prefer not to answer</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form>
                <Button variant="primary" onClick={() => requestRegister()} 
                disabled={!firstName||!lastName||!email||!password||!(password===confirmPassword)||
                !streetName||!houseNr||!city||
                !postcode||!genderState}>Register
                </Button>
            </Modal>
        </div>
    )

}

export default RegisterForm;