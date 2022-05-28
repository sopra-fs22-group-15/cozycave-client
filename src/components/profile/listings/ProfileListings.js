import {Button, Row, Col, Container, Spinner} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {api, handleError} from '../../../helpers/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/Listings.scss";
import ProfileListingsList from "./ProfileListingsList";

const ProfileListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const requestResults = async () => {
        try {
            // TODO: add endpoint for getting listings of a user
            response = await api.get('/listings');

            setListings(response.data.filter(listing => listing.publisher.id === user.id));
            // setListings(mockListings.slice(1, 3));
            setLoading(false);
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
            {!loading ? (
                <>
                    {listings.length > 0 ? <ProfileListingsList listings={listings} getListings={requestResults}/> : (
                        <Row>
                            <Col>
                                <h6 style={{color: "#a9a9a9"}}>
                                    Wow, such empty! Create listings to see them here.
                                </h6>
                            </Col>
                        </Row>
                    )}
                </>
            ) : (
                <div className="d-flex justify-content-center align-items-center spinner-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
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

export default ProfileListings;