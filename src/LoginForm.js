import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import User from './models/User';
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { api, handleError } from './helpers/api'
import { SHA3 } from 'sha3';

function LoginForm(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const requestLogin = async () => {
    try {
      const password_hashed = new SHA3(512);
      password_hashed.update(password);
      const requestBody = JSON.stringify({ email, password_hashed });
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
        <Form fluid='true' style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 20 }}>
          <Form.Label>Email address</Form.Label>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Symbol</InputGroup.Text>
            <Form.Control type="email" placeholder="jane.doe@gmail.com" onChange={e => setEmail(e.target.value)} />
          </InputGroup>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>Symbol</InputGroup.Text>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>

        </Form>
        <Button variant="primary" onClick={() => requestLogin()} disabled={!email|!password}>Log In</Button>

      </Modal>
    </div>
  )

}

export default LoginForm;