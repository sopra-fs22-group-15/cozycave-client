import React from "react";
import "../../styles/Listings.scss";
import {Badge, Col, Spinner} from "react-bootstrap";
import {addressStringBuilder} from "../../helpers/addressStringBuilder";
import Button from "../util/Button";
import {useNavigate} from "react-router-dom";

const ListingElement = props => {

    const navigate = useNavigate();

    const decideColor = (listingType) => {
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

    const openAdOverview = (any) => {
        navigate('/v1/listings/' + any);
    }

    const listing = props.listing;

    return (
        <Col>
            <div className="card mb-5 listing-cards" style={{maxWidth: "700px"}} onClick={() => {openAdOverview(listing.uuid)}}>
                <div className="row no-gutters">
                    {props.image ? (
                        <div className="col-md-6">
                            <img src={props.image} className="card-img img-fluid" alt="..."/>
                        </div>
                    ) : (
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </div>
                    )}
                    <div className="col-md-6">
                        <div className="card-body">
                            <div className="listing-details">
                                <span className="listing-price">CHF {listing.rent}</span>
                                <span className="listing-area">{listing.sqm} m²</span>
                                <span className="listing-rooms">{listing.rooms} Rooms</span>
                            </div>
                            <hr/>
                            <div className="listing-type">
                                <span className="listing-address">{addressStringBuilder(listing.address)}</span>
                                {decideColor(listing.listingtype)}
                            </div>
                            <hr/>
                            <p className="card-text">{listing.description}.</p>
                            <div className="button-container">
                                <Button variant="outline-primary" onClick={() => {openAdOverview(listing.uuid)}}>View Details</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ListingElement;