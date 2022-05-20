import {Modal, Button, Form, InputGroup, Spinner} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import React, {useContext, useEffect, useState} from 'react';
import {api, handleError} from './helpers/api'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "./context/auth-context";

const LoginForm = props => {
    const auth = useContext(AuthContext);

    const {hideLogin} = props;
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const requestLogin = async () => {
        setLoading(true);
        try {
            const requestBody = JSON.stringify(
                {
                    "authentication": {
                        "email": email,
                        "password": password
                    }
                }
            );
            const response = await api.put('/auth/login', requestBody);

            // Get the returned user and update a new object.
            const responseToken = response.data.authentication.token;
            const responseUser = response.data;

            auth.login(responseUser, responseToken);

            // Store the token into the local storage.
            setLoading(false);
            // Login successfully worked --> navigate to the landing page in the AppRouter
            navigate(`/overview`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            hideLogin();
        }
    }, [hideLogin, auth.isLoggedIn]);

    return (
        <Modal show={props.loginOpen} onHide={hideLogin}>
            {loading ? (<div className="d-flex justify-content-center align-items-center" style={{height: "15rem"}}>
                <Spinner animation="border" variant="primary"/>
            </div>) : (
                <>
                    <Form fluid='true'
                          style={{paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 20}}>
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                            <Form.Control type="email" placeholder="jane.doe@gmail.com"
                                          onChange={e => setEmail(e.target.value)}/>
                        </InputGroup>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-5">
                            <Button variant="primary" type="submit" style={{"width": "100%"}}
                                    onClick={() => requestLogin()} disabled={!email | !password}>Log
                                In</Button>
                        </div>
                    </Form>
                </>
            )}
        </Modal>
    )

}

export default LoginForm;