import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { api, handleError } from './helpers/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function LoginForm(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const requestLogin = async () => {
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
      const responseUser = response.data.details;

      // Store the token into the local storage.
      localStorage.setItem('token', responseToken, response.headers["Authorization"]);
      localStorage.setItem('firstname', responseUser.first_name);
      localStorage.setItem('lastname', responseUser.last_name);
      localStorage.setItem('gender', responseUser.gender);
      localStorage.setItem('user', responseUser);

      // Login successfully worked --> navigate to the landing page in the AppRouter
      navigate(`/`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  return (
    <div>
      <Modal show={props.loginOpen} onHide={props.hideLogin}>
        <Form fluid='true' style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 20 }}>
          <Form.Label>Email address</Form.Label>
          <InputGroup className='mb-3'>
            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
            <Form.Control type="email" placeholder="jane.doe@gmail.com" onChange={e => setEmail(e.target.value)} />
          </InputGroup>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>

        </Form>
        <Button variant="primary" onClick={() => requestLogin()} disabled={!email | !password}>Log In</Button>

      </Modal>
    </div>
  )

}

export default LoginForm;