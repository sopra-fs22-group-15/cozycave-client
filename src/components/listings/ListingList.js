import React from "react";
import ListingElement from "./ListingElement";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Spinner} from "react-bootstrap";
import "../../styles/Listings.scss";
import {displayPictures} from "../../helpers/displayPictures";

const ListingList = props => {

    const colPerRow = 2;

    // TODO: Change when image uplaod is implemented on backend


    return (
        <Container className="listing-results">
            <Row>
                <h3><span>Found {props.listings.length} results</span></h3>
            </Row>
            <Row xs={1} md={colPerRow}>
                {props.listings ? props.listings.map(listing => (

                    <ListingElement
                        key={listing.id}
                        image={displayPictures(listing.picture ? listing.picture.url : null)}
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