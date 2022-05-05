import React from "react";
import {Accordion} from "react-bootstrap";

import {decideBadgeColorListingType} from "../../../helpers/decideColorByListingType";

import ListingElement from "../../listings/ListingElement";
import {displayPictures} from "../../../helpers/displayPictures";

const ProfileApplicationsElement = props => {

    const {application, index} = props;
    return (
        <Accordion.Item eventKey={index}>
            <Accordion.Header>
                {application.name}
                <span style={{marginLeft: "10px"}}>{decideBadgeColorListingType(application.listing_type)}</span>
            </Accordion.Header>
            <Accordion.Body>
                <ListingElement listing={application} image={displayPictures(application.picture.url)}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ProfileApplicationsElement;