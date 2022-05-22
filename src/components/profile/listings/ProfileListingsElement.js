import React, { useState, useEffect } from "react";
import { Accordion, Button, ButtonGroup, Alert, Col, Row, Stack, Table } from "react-bootstrap";
import { decideBadgeColorListingType } from "../../../helpers/decideColorByListingType";
import ListingElement from "../../listings/ListingElement";
import { displayPictures } from "../../../helpers/displayPictures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { api, handleError } from '../../../helpers/api'
import { mockApplications } from "../../util/mockApplications";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ForeignViewProfile from "../ForeignViewProfile";


const ProfileListingsElement = props => {
    let applicationsResponse = null;
    const { listing, index } = props;
    const [applications, setApplications] = useState([]);

    const navigate = useNavigate();

    const requestApplications = async () => { //TODO: needs to be tested
        try {
            applicationsResponse = await api.get(`/listings/${listing.id}/applications`);
            setApplications(applicationsResponse);

        } catch (error) {
            applicationsResponse = mockApplications;
            setApplications(applicationsResponse);
           // alert(`Something went wrong during display of applicants: \n${handleError(error)}`);
        }


    }

    const deleteListing = async () => { //TODO: needs to be tested
        try {
            await api.delete(`/listings/${listing.id}`);
            props.getListings();
            toast.success("Listing deleted successfully!");
        } catch (error) {
            toast.error(`Could not delete listing: \n${handleError(error)}`);
        }

    }

    const updateListingApplication = async (applicationId, status) => { //TODO: needs to be tested with API 
        try {
            let user = JSON.parse(localStorage.getItem('user'));
            const requestBody = JSON.stringify({
                authentication: user.authentication,
                applications_status: status
            })
            console.log(requestBody);
            let response = await api.put(`/listings/${listing.id}/applications/${applicationId}`, requestBody);
        } catch (error) {
            alert(`${handleError(error)}`);
        }
    }

    const openProfile = (user) => {
        return (<ForeignViewProfile user={user} />)
    }

    const renderApplications = () => {
        return (
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {applications.map(application => {
                        return (application.applications_status === 'PENDING' ?
                            (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td><Button variant='link' onClick={() => openProfile(application.owner)}>
                                        {application.owner.firstname} {application.owner.lastname}</Button>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <ButtonGroup>
                                            <Button variant="success" className='mx-auto'
                                                onClick={() => updateListingApplication(application.id, 'ACCEPTED')}>
                                                Accept
                                            </Button>
                                            <Button variant="dark" className='mx-auto'
                                                onClick={() => updateListingApplication(application.id, 'DENIED')}>
                                                Reject
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td><Button variant='link' onClick={() => openProfile(application.owner)}>
                                        {application.owner.firstname} {application.owner.lastname}</Button>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {application.applications_status === 'ACCEPTED' ?
                                            (<Alert variant='success'>Approved, contact candidate by email</Alert>) :
                                            (<Alert variant='danger'>Denied</Alert>)
                                        }
                                    </td>
                                </tr>
                            )
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        requestApplications();
    }, []);


    return (
        <Accordion.Item eventKey={index}>
            <Accordion.Header>
                {listing.title}
                <span style={{ marginLeft: "10px" }}>{decideBadgeColorListingType(listing.listing_type)}</span>
            </Accordion.Header>
            <Accordion.Body>
                <ListingElement listing={listing}
                    image={displayPictures(listing.picture ? listing.picture.url : null)} />
                <Row>
                    <Col style={{ marginBottom: 20 }}>
                        <Stack direction="horizontal">
                            <Button variant="warning" className="mx-auto" onClick={() => {
                                navigate(`/edit-listing/${listing.uuid}`)
                            }}>
                                <span style={{ marginRight: "5px" }}>Edit Listing</span>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <div className="vr mx-auto" />
                            <Button variant="danger" className='mx-auto' onClick={deleteListing}>
                                <span style={{ marginRight: "5px" }}>Delete Listing</span>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    <h4>Applicants:</h4>
                    {applications.length > 0 ? renderApplications() : (<p>No applicants yet :(</p>)}
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default ProfileListingsElement;