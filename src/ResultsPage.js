import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup } from 'react-bootstrap'
import { useNavigate, useEffect } from 'react-router-dom'
import React, { useState } from 'react';
import { api, handleError } from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import { SHA3 } from 'sha3';

function ResultsPage(props) {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    useEffect(() => {
        requestResults();
    }, []);

    const requestResults = async () => {
        try {
            if (!props.query) {
                const response = await api.get('/listings/');

                // Get the returned listings, create new objects for each.


                // Login successfully worked --> navigate to the landing page in the AppRouter
            } else {

            }
            setListings(response.data);

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    }

    return (
        <div>
            <div className='item-countainer'>
                {listings.map((listing) => (
                    <div className='card'>
                        <img src={listing.pictures[0]} alt='' />
                        <h3>{listing.name}</h3>
                        <p>{listing.address}</p>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default ResultsPage;