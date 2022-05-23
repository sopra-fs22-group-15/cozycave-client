import React from "react";

import { Accordion, Spinner } from "react-bootstrap";

import ProfileApplicationsElement from "./ProfileApplicationsElement";

const ProfileApplicationsList = props => {

    return (
        <Accordion defaultActiveKey="0">
            {props.applications ? props.applications.map((application, index) => {
                return (
                    <ProfileApplicationsElement
                        key={index} application={application} index={index} getApplications = {props.getApplications}
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