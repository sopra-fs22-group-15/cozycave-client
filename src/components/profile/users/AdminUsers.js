import { Button, Row, Col, Container, Accordion, ToastContainer, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from '../../../helpers/api'
import ForeignViewProfile from '../ForeignViewProfile';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const requestResults = async () => {
        try {
            response = await api.get('/users');

            setUsers(response.data);
            // setListings(mockListings.slice(1, 3));
        } catch (error) {
            alert(`Something went wrong during display of users: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        requestResults();
    }, []);


    return (
        <Container>
            <Row>
                <Col>
                    <h5>
                        Manage users:
                    </h5>
                    <hr />
                </Col>
            </Row>
            {users.length > 0 ?
                <Accordion defaultActiveKey="0">
                    {users.map((user, index) => {
                        return (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {user.details.first_name} {user.details.last_name}
                                    <span style={{ marginLeft: "1rem" }}>({user.role})</span>
                                </Accordion.Header>
                                <AccordionBody>
                                    <ForeignViewProfile user={user} openAsOwnPage={false} />
                                </AccordionBody>
                            </Accordion.Item>
                        )
                    })}
                    <ToastContainer />
                </Accordion>
                : (
                    <Row>
                        <Col>
                            <div className='center-middle'>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </Col>
                    </Row>
                )}
        </Container>
    );
};

export default AdminUsers;