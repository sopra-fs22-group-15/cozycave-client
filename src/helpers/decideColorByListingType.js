import {Badge} from "react-bootstrap";
import React from "react";

export const decideBadgeColorListingType = (listingType) => {
    if (listingType === "FLAT") {
        return (
            <Badge bg="primary">Flat</Badge>
        )
    } else if (listingType === "ROOM") {
        return (
            <Badge bg="success">Room</Badge>
        )
    } else {
        return (
            <Badge bg='warning'>House</Badge>
        )
    }
};