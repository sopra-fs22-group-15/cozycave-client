import {Container, Spinner} from 'react-bootstrap'
import React, {useState, useEffect} from 'react';
import ListingList from "./components/listings/ListingList";
import "./styles/ResultsPage.scss";

function ResultsPage(props) {
    const [listings, setListings] = useState(props.listings);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.listings) {
            setListings(props.listings);
            setIsLoading(false);
        }
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="center-middle">
                    <Spinner animation="border" variant="primary"/>
                </div>
            ) : (
                    <Container className="center-middle">
                        {props.listings ? <ListingList requestResults={props.requestResults} listings={listings}/> : "Loading..."}
                    </Container>
            )}
        </div>
    )

}

export default ResultsPage;