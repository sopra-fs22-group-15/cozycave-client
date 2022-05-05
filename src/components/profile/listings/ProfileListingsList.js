import React from "react";
import {Accordion, Spinner} from "react-bootstrap";
import ProfileListingsElement from "./ProfileListingsElement";

const ProfileListingsList = props => {
    return (
        <Accordion defaultActiveKey="0">
            {props.listings ? props.listings.map((listing, index) => {
                return (
                    <ProfileListingsElement key={index} listing={listing} index={index}/>
                )
            }): (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </Accordion>
    )
}

export default ProfileListingsList;