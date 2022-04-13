import { Modal, Button, Form, Row, Col, Dropdown, FormLabel } from 'react-bootstrap'
function RegisterForm(props) {
    const handleRegister = () => {

    }

    return (
        <div>
            <Modal show={props.registerOpen} onHide={props.hideRegister}>
                <Form fluid style={{paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 30}}>
                    <Row classname='g-2' style={{paddingBottom:10}}>
                        <Col md>
                            <FormLabel controlId="firstNameInput">First Name</FormLabel>
                            <Form.Control type="firstName" placeholder="Jane" />

                        </Col>
                        <Col md>
                            <FormLabel controlId="lastNameInput" label="Last Name">Last Name</FormLabel>
                            <Form.Control type="lastName" placeholder="Doe" />

                        </Col>
                    </Row>

                    <Row classname='g-2'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="jane.doe@gmail.com" />
                        </Form.Group>
                    </Row>

                    <Row classname='g-2'>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Row>

                    <Row classname='g-2'>
                        <Col md>
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control type="streetName" placeholder="Irchelstrasse"/>
                        </Col>
                        <Col md>
                            <Form.Label>House Number</Form.Label>
                            <Form.Control type="houseNr" placeholder="10"/>
                        </Col>
                    </Row>

                    <Row classname='g-2' style={{paddingTop: 30}}>
                        <Col></Col>
                        <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="gender-dropdown">
                                Gender
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Male</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
                                <Dropdown.Item href="#/action-4">Prefer not to answer</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
                <Button variant="primary" onClick={() => handleRegister()}>Register</Button>
            </Modal>
        </div>
    )

}

export default RegisterForm;