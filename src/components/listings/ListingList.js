import React from "react";
import ListingElement from "./ListingElement";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Form, Spinner} from "react-bootstrap";
import "../../styles/Listings.scss";
import {displayPictures} from "../../helpers/displayPictures";
import _ from "lodash";

const ListingList = props => {

    const unsorted = props.listings;
    const colPerRow = 2;

    const [sortedListings, setSortedListings] = React.useState(props.listings);

    const sortHandler = (e) => {
            if (e.target.value === "price_asc") {
                setSortedListings(_.cloneDeep(props.listings.sort((a, b) => parseFloat(a.rent) - parseFloat(b.rent))));
            } if (e.target.value === "price_desc") {
                setSortedListings(_.cloneDeep(props.listings.sort((a, b) => parseFloat(b.rent) - parseFloat(a.rent))));
            } if (e.target.value === "area_asc") {
                setSortedListings(_.cloneDeep(props.listings.sort((a, b) => parseFloat(a.sqm) - parseFloat(b.sqm))));
            } if (e.target.value === "area_desc") {
                setSortedListings(_.cloneDeep(props.listings.sort((a, b) => parseFloat(b.sqm) - parseFloat(a.sqm))));
            }
            if (e.target.value === "") {
                setSortedListings(_.cloneDeep(unsorted));
            }
    }
    console.log(sortedListings);
    return (
        <Container className="listing-results">
            <Row style={{marginTop: "10px"}}>
                <h3><span>Found {props.listings.length} results</span></h3>
            </Row>
            {unsorted.length > 0 ? (
                <Form className="d-flex" style={{marginBottom: "10px"}} >
                    <Form.Group>
                        <Form.Select style={{maxWidth: "200px"}} onChange={e => sortHandler(e)}>
                            <option value="" defaultValue="">Sort by</option>
                            <option value="price_desc">Price (High to Low)</option>
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="area_desc">Area (High to Low)</option>
                            <option value="area_asc">Area (Low to High)</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            ) : null}
            <Row xs={1} md={colPerRow}>
                {props.listings && sortedListings ? sortedListings.map(listing => (
                    <ListingElement
                        key={listing.id}
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