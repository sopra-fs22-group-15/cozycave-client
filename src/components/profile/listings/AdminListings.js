import { Button, Row, Col, Container, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from '../../../helpers/api'
import { mockListings } from "../../util/mockListings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProfileListingsList from "./ProfileListingsList";

const AdminListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const requestResults = async () => {//TODO: uncomment when admin functions are implemented
        try {
            // TODO: add endpoint for getting listings of a user
            response = await api.get('/listings');

            setListings(response.data);
            //setListings(mockListings.slice(1, 3));
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
                        Manage listings:
                    </h5>
                    <hr />
                </Col>
            </Row>
            {listings.length > 0 ? <ProfileListingsList listings={listings} getListings={requestResults} /> : (
                <Row>
                    <Col>
                        <div className='center-middle'>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </Col>
                </Row>
            )}
            <hr />
            <Row>
                <Col className="d-flex justify-content-center align-content-center">
                    <Button variant="primary" type="submit" onClick={() => {
                        navigate("/create-listing")
                    }}>
                        <span style={{ marginRight: "5px" }}>Create a new listing</span>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </Button>
                </Col>
            </Row>
            <hr />
        </Container>
    );
};

export default AdminListings;