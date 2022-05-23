import React from "react";

import { Accordion, Spinner } from "react-bootstrap";
import { toast, ToastContainer} from 'react-toastify';
import ProfileApplicationsElement from "./ProfileApplicationsElement";

const ProfileApplicationsList = props => {
    const showDeleted = () => {
        toast.success("Successfully deleted application")
        props.getApplications();
    }

    return (
        <Accordion>
            <ToastContainer/>
            {props.applications ? props.applications.map((application, index) => {
                return (
                    <ProfileApplicationsElement
                        key={application.id} application={application} index={index} getApplications = {props.getApplications} 
                        showDeleted={showDeleted}
                    />
                )
            }) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </Accordion>

    )
}

export default ProfileApplicationsList;