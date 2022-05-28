import React, { useState, useLayoutEffect } from "react";
import { Accordion, Alert, Button } from "react-bootstrap";
import { decideBadgeColorListingType } from "../../../helpers/decideColorByListingType";
import { api, handleError } from '../../../helpers/api'
import { mockListings } from "../../util/mockListings";
import ListingElement from "../../listings/ListingElement";
import { displayPictures } from "../../../helpers/displayPictures";



const ProfileApplicationsElement = props => {
    const { application, index } = props;
    const { showDeleted } = props;
    const [listing, setListing] = useState(mockListings[0]);
    let queryResponse = null;
    const user = JSON.parse(localStorage.getItem('user'))

    const deleteApplication = async () => {
        try {
            let response = await api.delete(`/users/${user.id}/applications/${application.id}`);
            showDeleted()

        } catch (error) {
            alert(`Could not delete application: \n${handleError(error)}`);
        }
    }

    const renderApplication = () => {
        if (application.application_status === 'ACCEPTED') {
            return (
                <div>
                    <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert variant='success' style={{textAlign:'center'}}>
                            Your application has been approved! The listing owner will contact you by email
                        </Alert>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='danger' onClick={() => deleteApplication()}>Delete Application</Button>
                    </div>
                </div>
            )
        } else if (application.application_status === 'DENIED') {
            return (
                <div>
                    <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert variant='danger' style={{textAlign:'center'}}>
                            Unfortunately, your application was unsuccessful. Tough luck!
                        </Alert>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='danger' onClick={() => deleteApplication()}>Delete Application</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
                        <Alert variant='primary' style={{textAlign:'center'}}>
                            Your application has been submitted, and will be reviewed by the listing owner
                        </Alert>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='danger' onClick={deleteApplication}>Delete Application</Button>
                    </div>
                </div>

            )
        }
    };

    const getListingByApplication = async (id) => {
        try {
            queryResponse = await api.get(`/listings/${id}`);
            setListing(queryResponse.data);
            

        } catch (error) {
            queryResponse = mockListings[1];
            setListing(queryResponse);
            alert(`Something went wrong during display of your applications: \n${handleError(error)}`);
        }

    };

    useLayoutEffect(() => {
        getListingByApplication(application.listing.id);
    }, []);

    return (
        <Accordion.Item eventKey={index}>
            
            <Accordion.Header>
                {listing.title}
                <span style={{ marginLeft: "10px" }}>{decideBadgeColorListingType(listing.listing_type)}</span>
            </Accordion.Header>
            <Accordion.Body>
                <ListingElement listing={listing} image={displayPictures(listing.picture ? listing.picture.url : null)} />
                <h4>Application Status:</h4>
                {renderApplication()}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ProfileApplicationsElement;