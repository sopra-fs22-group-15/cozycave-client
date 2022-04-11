import {Modal, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import User from './models/User';
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react';
import {api, handleError} from './helpers/api'

function LoginForm(props){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const toggleLogin = async() => {
      try {
        //TODO: hash the password
        const requestBody = JSON.stringify({email, password});
        const response = await api.put('/login/', requestBody);
  
        // Get the returned user and update a new object.
        const user = new User(response.data);
  
        // Store the token into the local storage.
        localStorage.setItem('token', user.token, response.headers["Authorization"]);
  
        // Login successfully worked --> navigate to the landing page in the AppRouter
        navigate(`/`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }

    return (
        <div>
          <Modal show={props.loginOpen} onHide={props.hideLogin}>
            <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
              <Button variant="primary" onClick={()=>toggleLogin()}>Log In</Button>
          </Modal>
        </div>
      )
        
}

export default LoginForm;