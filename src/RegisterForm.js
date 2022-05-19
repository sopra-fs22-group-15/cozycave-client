import {Modal, Button, Form, Row, Col, FormLabel, InputGroup, Spinner} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import React, {useContext, useEffect, useState} from 'react';
import {api, handleError} from './helpers/api'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "./context/auth-context";

const RegisterForm = props => {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [street, setStreet] = useState(null)
    const [houseNr, setHouseNr] = useState(null)
    const [city, setCity] = useState(null)
    const [zip_code, setzip_code] = useState(null)
    const [gender, setGender] = useState(null)
    const [state, setState] = useState(null)
    const [phone, setPhone] = useState(null)
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const auth = useContext(AuthContext)

    const {hideRegister} = props;

    const requestRegister = async () => {
        setLoading(true);
        try {
            const requestBody = JSON.stringify({
                authentication: {
                    email: email,
                    password: password
                },
                details: {
                    first_name: firstName,
                    last_name: lastName,
                    gender,
                    birthday: null,
                    address: {
                        name: null,
                        description: null,
                        apartment_number: null,
                        street,
                        house_number: houseNr,
                        city,
                        state,
                        zip_code: zip_code,
                        country
                    },
                    biography: null,
                    phone_number: phone,
                },
            });
            const response = await api.post('/auth/register', requestBody);

            // Get the returned user and update a new object.
            const token = response.data.authentication.token;
            const user = response.data;
            // Store the token into the local storage.

            console.log(response.data);

            // localStorage.setItem('token', token);
            auth.login(user, token)

            setLoading(false);
            // Login successfully worked --> navigate to the landing page in the AppRouter
            navigate(`/`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            hideRegister();
        }
    }, [hideRegister, auth.isLoggedIn]);

    return (
        <div>
            <Modal show={props.registerOpen} onHide={hideRegister}>
                {loading ? (
                    <>
                        <div className="d-flex justify-content-center align-items-center" style={{height: "50rem"}}>
                            <Spinner animation="border" variant="primary"/>
                        </div>
                    </>
                ) : (
                    <>
                        <Form fluid='true'
                              style={{paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 30}}>
                            <Row className='g-2' style={{paddingBottom: 10}}>
                                <Col md>
                                    <FormLabel controlId="firstNameInput">First Name*</FormLabel>
                                    <Form.Control type="firstName" placeholder="Jane"
                                                  onChange={(e) => setFirstName(e.target.value)}/>

                                </Col>
                                <Col md>
                                    <FormLabel controlId="lastNameInput" label="Last Name">Last Name*</FormLabel>
                                    <Form.Control type="lastName" placeholder="Doe"
                                                  onChange={(e) => setLastName(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address*</Form.Label>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </InputGroup.Text>
                                        <Form.Control type="email" placeholder="jane.doe@gmail.com"
                                                      onChange={e => setEmail(e.target.value)}/>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className='g-2'>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password*</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock}/>
                                        </InputGroup.Text>
                                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className='g-2'>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password*</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faLock}/>
                                        </InputGroup.Text>
                                        <Form.Control type="password"
                                                      onChange={(e) => setConfirmPassword(e.target.value)}/>
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>Street Name*</Form.Label>
                                    <Form.Control type="streetName" placeholder="Irchelstrasse"
                                                  onChange={(e) => setStreet(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>House Number*</Form.Label>
                                    <Form.Control type="houseNr" placeholder="10"
                                                  onChange={(e) => setHouseNr(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control type="city" placeholder="Zurich"
                                                  onChange={(e) => setCity(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Postcode*</Form.Label>
                                    <Form.Control type="zip_code" placeholder="8000"
                                                  onChange={(e) => setzip_code(e.target.value)}/>
                                </Col>
                            </Row>

                            {
                                // TODO: Change to dropdown with countries
                            }

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="state" placeholder="Zurich"
                                                  onChange={(e) => setState(e.target.value)}/>
                                </Col>
                                <Col md>
                                    <Form.Label>Country*</Form.Label>
                                    <Form.Control type="country" placeholder="Switzerland"
                                                  onChange={(e) => setCountry(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="tel" placeholder="+41 012 345 678"
                                                  onChange={(e) => setPhone(e.target.value)}/>
                                </Col>
                            </Row>

                            <Row className='g-2' style={{paddingTop: 30}}>
                                <Col>
                                    <Form.Select onChange={(e) => setGender(e.target.value)}>
                                        <option selected disabled hidden>Select your gender</option>
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                        <option>OTHER</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                        <Button variant="primary" onClick={() => requestRegister()}
                                disabled={!firstName || !lastName || !email || !password || !(password === confirmPassword) ||
                                    !street || !houseNr || !city ||
                                    !zip_code || !gender}>Register
                        </Button>
                    </>
                )}
            </Modal>
        </div>
    )

}

export default RegisterForm;