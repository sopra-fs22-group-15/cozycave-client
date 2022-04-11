import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Dropdown } from 'react-bootstrap'
function RegisterForm(props) {
    const handleRegister = () => {

    }

    return (
        <div>
            <Modal show={props.registerOpen} onHide={props.hideRegister}>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="firstname" placeholder="First name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="lastname" placeholder="Last name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="address" placeholder="Address" />
                    </Form.Group>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="gender-dropdown">
                            Gender
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Male</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Prefer not to answer</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="account-dropdown">
                            Account Type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Landlord Account</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Student Account</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
                <Button variant="primary" onClick={() => handleRegister()}>Register</Button>
            </Modal>
        </div>
    )

}

export default RegisterForm;