import {Container, Spinner} from 'react-bootstrap'
import React, {useState, useEffect} from 'react';
import {api, handleError} from './helpers/api'
import ListingList from "./components/listings/ListingList";
import {mockListings} from "./components/util/mockListings";
import "./styles/ResultsPage.scss";

function ResultsPage(props) {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let response = null;

    const requestResults = async () => {
        try {
            if (!props.query) {
                // Get the returned listings, create new objects for each.
                response = await api.get('/listings');
            } else {
                //for future search terms
            }
            // TODO: Uncomment when backend is ready
            setListings(response.data);
            // TODO: remove when backend is ready
            // setListings(mockListings);
            setIsLoading(false);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
            // TODO: Remove mock listings when API is ready
            setListings(mockListings);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        requestResults();
    }, [requestResults]);


    return (
        <div>
            {isLoading ? (
                <div className="center-middle">
                    <Spinner animation="border" variant="primary"/>
                </div>
            ) : (
                    <Container className="center-middle">
                        {listings ? <ListingList listings={listings}/> : "Loading..."}
                    </Container>
            )}
        </div>
    )

}

export default ResultsPage;