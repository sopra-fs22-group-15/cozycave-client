import React from "react";
import "../../styles/Listings.scss";
import {Col, Spinner} from "react-bootstrap";
import {addressStringBuilder} from "../../helpers/addressStringBuilder";
import Button from "../util/Button";
import {useNavigate} from "react-router-dom";
import {decideBadgeColorListingType} from "../../helpers/decideColorByListingType";

const ListingElement = props => {

    const navigate = useNavigate();

    const openAdOverview = (any) => {
        navigate('/listings/' + any);
    }

    const listing = props.listing;

    const truncateDescription = (input) => {
        if(input.length>100){
            return input.substring(0,99)+ '...';
        }else{
            return input;
        }
    }

    return (
        <Col>
            <div className="card mb-5 listing-cards" style={{maxWidth: "700px"}} onClick={() => {openAdOverview(listing.id)}}>
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
                                {decideBadgeColorListingType(listing.listing_type)}
                            </div>
                            <hr/>
                            <p className="card-text">{truncateDescription(listing.description)}.</p>
                            <div className="button-container">
                                <Button variant="outline-primary" onClick={() => {openAdOverview(listing.id)}}>View Details</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ListingElement;