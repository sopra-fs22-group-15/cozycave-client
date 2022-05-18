import {Container} from 'react-bootstrap'
import React, {useState, useEffect} from 'react';
import {api, handleError} from './helpers/api'
import ListingList from "./components/listings/ListingList";
import {mockListings} from "./components/util/mockListings";

function ResultsPage(props) {
    const [listings, setListings] = useState([]);
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

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);

            // TODO: Remove mock listings when API is ready
            setListings(mockListings);
        }
    }

    useEffect(() => {
        requestResults();
    }, []);


    return (
        <div>
            <Container className="center-middle">
                {listings ? <ListingList listings={listings}/> : "Loading..."}
            </Container>
        </div>
    )

}

export default ResultsPage;