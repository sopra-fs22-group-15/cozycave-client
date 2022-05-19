import { Modal, Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';
import { api, handleError } from './helpers/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./context/auth-context";
import { LoginContext } from './context/login-context';
import { toast, ToastContainer } from 'react-toastify';

const ResetPasswordForm = props => {
    const login = useContext(LoginContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const requestReset = async () => { //TODO: connect to backend
        try {
            let users = await api.get('/users');
            let id = null;
            users.array.forEach(element => {
                if(element.authentication.email===email){
                    id=element.id;
                }
                
            });
            if(id===null){
                toast.warn("Incorrect email entered")
            }else{
                const requestBody = JSON.stringify(
                    {
                        "authentication": {
                            "email": email,
                            "password": password
                        }
                    }
                );
                const response = await api.put(`/users/${id}`, requestBody); 
                login.setReset(false);
                login.displaySuccess();
            }         

        } catch (error) {
            alert(`Something went wrong during password reset: \n${handleError(error)}`);
        }
    }

    return (
        <Modal show={login.resetOpen} onHide={() => login.setReset(false)}>
                <>
                    <Form fluid='true'
                        style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 20 }}>
                            <h4 className='d-flex justify-content-center'>Reset Your Password</h4>
                            <ToastContainer />
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                            <Form.Control type="email" placeholder="jane.doe@gmail.com"
                                onChange={e => setEmail(e.target.value)} />
                        </InputGroup>

                        <Form.Group className='mb-1' controlId="formPassword">
                            <Form.Label>New Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            </InputGroup>
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" style={{ "width": "100%" }}
                                onClick={() => requestReset()} disabled={!email | !password}>Reset Password</Button>
                        </div>
                    </Form>
                    
                </>

        </Modal>
    )

}

export default ResetPasswordForm;