import { Button, Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { handleError } from '../../../helpers/api'
import { mockListings } from "../../util/mockListings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProfileListingsList from "./ProfileListingsList";

const ProfileListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([])
    let response = null;
    const user = localStorage.getItem('user')

    const requestResults = async () => {
        try {
            //response = await api.get('/listings/'+user.uuid);
            //setListings(response.data);
            // TODO: Change when API is ready
            setListings(mockListings.slice(1, 3));
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
                        Manage your listings:
                    </h5>
                    <hr />
                </Col>
            </Row>
            <ProfileListingsList listings={listings} />
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

export default ProfileListings;