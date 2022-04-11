import {Modal, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
const LoginForm = (props) => {
    const toggleLogin = () => {
        props.isOpen=false
    }
    return (
        <div>
          <Modal show={props.isOpen}>// isOpen prop is determined by the container element
            <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" /> 
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