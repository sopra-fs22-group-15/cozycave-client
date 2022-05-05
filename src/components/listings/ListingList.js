import React from "react";
import ListingElement from "./ListingElement";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Spinner} from "react-bootstrap";
import "../../styles/Listings.scss";
import {displayPictures} from "../../helpers/displayPictures";

const ListingList = props => {

    const colPerRow = 2;

    return (
        <Container className="listing-results">
            <Row xs={1} md={colPerRow}>
                {props.listings ? props.listings.map(listing => (
                    <ListingElement
                        key={listing.uuid}
                        image={displayPictures(listing.pictures)}
                        listing={listing}
                    />
                )) : (
                    <Spinner animation="border" role="status" size="lg">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
            </Row>
        </Container>
    );
}

export default ListingList;