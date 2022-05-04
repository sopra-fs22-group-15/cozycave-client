import React from "react";
import ListingElement from "./ListingElement";

const ListingList = props => {
    return (
        <div className="listing-list">
            {props.listings ? props.listings.map(listing => (
                <ListingElement
                    key={listing.uuid}
                    image={listing.pictures[0]}
                />
            )) : "Loading..."}
        </div>
    );
}

export default ListingList;