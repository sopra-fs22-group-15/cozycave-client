import React from "react";
import { Accordion, Spinner } from "react-bootstrap";
import ProfileListingsElement from "./ProfileListingsElement";
import {ToastContainer} from "react-toastify";

const ProfileListingsList = props => {

    const reload = () => {
        props.getListings();
    }

    return (
        <Accordion defaultActiveKey="0">
            {props.listings ? props.listings.map((listing, index) => {
                return (
                    <ProfileListingsElement key={index} listing={listing} index={index} getListings={reload}/>
                )
            }) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
            <ToastContainer/>
        </Accordion>
    )
}

export default ProfileListingsList;