import React, { useState, useLayoutEffect } from "react";
import { Accordion, Alert, Button, Toast } from "react-bootstrap";
import { decideBadgeColorListingType } from "../../../helpers/decideColorByListingType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { api, handleError } from '../../../helpers/api'
import { mockListings } from "../../util/mockListings";
import ListingElement from "../../listings/ListingElement";
import { displayPictures } from "../../../helpers/displayPictures";


const ProfileApplicationsElement = props => {
    const { application, index } = props;
    const [listing, setListing] = useState(mockListings[0]);
    let queryResponse = null;
    const [showDeleted, setShowDeleted] = useState(false);
    const toggleShowDeleted = () => {setShowDeleted(!showDeleted)};

    const deleteApplication = async () => {
        try {
            // TODO: change when API is ready
            //let response = await api.delete('/applications' + application.id);
            toggleShowDeleted();

        } catch (error) {
            alert(`Could not delete application: \n${handleError(error)}`);
        }
    }

    const renderApplication = () => {
        if (application.application_status === 'approved') {
            return (
                <Alert variant='success'>
                    Your application has been approved! The listing owner will contact you by email
                </Alert>
            )
        } else if (application.application_status === 'denied') {
            return (
                <Alert variant='danger'>
                    Unfortunately, your application was unsuccessful. Tough luck!
                </Alert>
            )
        } else {
            return (
                <div>
                    <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert variant='primary'>
                            Your application has been submitted, and will be reviewed by the listing owner
                        </Alert>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='danger' onClick={deleteApplication}>Delete Application</Button>
                        <Toast show={showDeleted} position='bottom-center' onClose={toggleShowDeleted}>
                            <Toast.Header>
                                <strong className="me-auto">Admin</strong>
                                <small>a few seconds ago</small>
                            </Toast.Header>
                            <Toast.Body>Successfully removed application</Toast.Body>
                        </Toast>
                    </div>
                </div>

            )
        }
    };

    const getListingByApplication = async (uuid) => {
        try {
            //queryResponse = await api.get('/listings/' + uuid);
            queryResponse = mockListings[1];
            setListing(queryResponse);

        } catch (error) {
            alert(`Something went wrong during display of your applications: \n${handleError(error)}`);
        }

    };

    useLayoutEffect(() => {
        getListingByApplication(application.uuid);
    }, []);

    return (
        <Accordion.Item eventKey={index}>
            <Accordion.Header>
                {listing.name}
                <span style={{ marginLeft: "10px" }}>{decideBadgeColorListingType(listing.listing_type)}</span>
            </Accordion.Header>
            <Accordion.Body>
                <ListingElement listing={listing} image={displayPictures(listing.picture.url)} />
                <h4>Application Status:</h4>
                {renderApplication()}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ProfileApplicationsElement;