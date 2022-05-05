import React from "react";
import {Accordion, Button, Col, Row} from "react-bootstrap";
import {decideBadgeColorListingType} from "../../../helpers/decideColorByListingType";
import ListingElement from "../../listings/ListingElement";
import {displayPictures} from "../../../helpers/displayPictures";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const ProfileListingsElement = props => {
    const {listing, index} = props;
    return (
        <Accordion.Item eventKey={index}>
            <Accordion.Header>
                {listing.name}
                <span style={{marginLeft: "10px"}}>{decideBadgeColorListingType(listing.listingtype)}</span>
            </Accordion.Header>
            <Accordion.Body>
                <ListingElement listing={listing} image={displayPictures(listing.pictures)}/>
                <Row>
                    <Col className="d-flex justify-content-end align-content-center">
                        <Button variant="danger" type="submit">
                            <span style={{marginRight: "5px"}}>Delete Listing</span>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default ProfileListingsElement;