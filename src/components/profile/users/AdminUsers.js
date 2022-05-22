import { Button, Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from '../../../helpers/api'
import { mockListings } from "../../util/mockListings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProfileListingsList from "./ProfileListingsList";

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const requestResults = async () => {
        try {
            response = await api.get('/users');

            setListings(response.data);
            // setListings(mockListings.slice(1, 3));
        } catch (error) {
            alert(`Something went wrong during display of listings: \n${handleError(error)}`);
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
            {listings.users > 0 ?
                <Accordion defaultActiveKey="0">
                    {props.listings ? props.listings.map((listing, index) => {
                        return (
                            <ProfileListingsElement key={index} listing={listing} index={index} getListings={reload} />
                        )
                    }) : (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}
                    <ToastContainer />
                </Accordion>
                : (
                    <Row>
                        <Col>
                            <h6 style={{ color: "#a9a9a9" }}>
                                No users yet? Wonder how this happened
                            </h6>
                        </Col>
                    </Row>
                )}
        </Container>
    );
};

export default AdminUsers;