import { Button, Form, Row, Col, Image, Figure, Container, Badge, Accordion, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { api, handleError } from '../../helpers/api'

const ProfileListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([])
  let listingsResponse = null;
  let applicationsResponse = null;
  const user = localStorage.getItem('user')

  const requestResults = async () => {
    try {
      listingsResponse = await api.get('/listings/'+user.uuid);
      setListings(listingsResponse.data);

      
    } catch (error) {
      alert(`Something went wrong during display of listings: \n${handleError(error)}`);

      setListings([
        {
          "uuid": 1,
          "creation_date": "30.10.2000",
          "name": "flat name",
          "description": "This is a nice flat for students looking to be close to both the university and the party scene in Zurich",
          "address": {
            "houseNr": 11,
            "streetName": "Langstrasse",
            "city": "Zurich",
            "postcode": "8005"
          },
          "published": true,
          "pictures": ['https://is1-2.housingcdn.com/4f2250e8/73b4c8375352d2558cc55aeb0bb7f937/v0/fs/devi_shanmuga_flats-surappattu-chennai-devi_flat_promoters.jpeg'],
          "sqm": 82,
          "type": "FLAT",
          "furnished": true,
          "availableTo": ['Male', 'Female', 'Other'],
          "available": true,
          "rent": 3150,
          "deposit": 5000,
          "rooms": 3.5
        },
        {
          "uuid": 500,
          "creation_date": "30.10.2000",
          "name": "flat name",
          "description": "Nice, quiet flat for a low price",
          "address": {
            "houseNr": 20,
            "streetName": "Irchelstrasse",
            "city": "Zurich",
            "postcode": "8001"
          },
          "published": true,
          "pictures": ['https://bsmedia.business-standard.com/_media/bs/img/article/2018-06/08/full/1528397457-4687.jpg'],
          "sqm": 82,
          "type": "FLAT",
          "furnished": true,
          "availableTo": ['Male', 'Female', 'Other'],
          "available": true,
          "rent": 1000,
          "deposit": 2500,
          "rooms": 2
        },
        {
          "uuid": 3,
          "creation_date": "30.10.2000",
          "name": "flat name",
          "description": "Located in the heart of the city, perfect for those who like to live a busy life",
          "address": {
            "houseNr": 15,
            "streetName": "Paradeplatz",
            "city": "Zurich",
            "postcode": "8001"
          },
          "published": true,
          "pictures": ['https://cf.bstatic.com/xdata/images/hotel/max500/270853248.jpg?k=2a541c2ab4282babde3b0f5d90e00d7cbe4aa382b28876ee59936fd1ed84e5ac&o=&hp=1'],
          "sqm": 82,
          "type": "FLAT",
          "furnished": true,
          "availableTo": ['Male', 'Female', 'Other'],
          "available": true,
          "rent": 6000,
          "deposit": 10000,
          "rooms": 4
        },
        {
          "uuid": 4,
          "creation_date": "30.10.2000",
          "name": "flat name",
          "description": "Small, cheap room close to the university and shops with friendly roommates",
          "address": {
            "houseNr": 11,
            "streetName": "Langstrasse",
            "city": "Zurich",
            "postcode": "8005"
          },
          "published": true,
          "pictures": ['https://flatfox.ch/media/ff/2022/04/697b6p0hwq2959ebnviuyuedkvnt4yp3qavkhcq2r1w1md12q1.jpg'],
          "sqm": 82,
          "type": "ROOM",
          "furnished": true,
          "availableTo": ['Male', 'Female', 'Other'],
          "available": true,
          "rent": 500,
          "deposit": 500,
          "rooms": 1
        }
      ]);
    }
  }

  const handleListingClick = (uuid) => {
    navigate('/listings/' + uuid);
  }

  const renderListing = (uuid) => {
    return (
      <Container fluid>
      <Stack direction="horizontal">
        <Button variant="primary" className="mx-auto">View Listing</Button>
        <div className="vr" />
        <Button variant="warning" className="mx-auto">Edit Listing</Button>
        <div className="vr" />
        <Button variant="danger" className="mx-auto">Delete Listing</Button>
      </Stack>
      <h4 className="mt-3">Applications to your listing:</h4>
      {renderApplications(uuid)}
      </Container>
    );
  }

  const renderApplications = async (uuid) => {
    try{
      applicationsResponse = await api.get('/listings/'+uuid+"/applications");
      setListings(applicationsResponse.data);
    }catch (error){
      alert(`Something went wrong during display of applicants: \n${handleError(error)}`);
    }
    
  }

  useEffect(() => {
    requestResults();
  }, []);



  return (
    <div>
      <Container fluid>
        <h1>My Listings:</h1>
        <Accordion>
          {listings.map((listing) => (
            <Accordion.Item eventKey={listing.uuid}>
              <Accordion.Header>Listing {listing.uuid} ({listing.name})</Accordion.Header>
              <Accordion.Body>
                  {renderListing(listing.uuid)}
              </Accordion.Body>
            </Accordion.Item>

          ))}

        </Accordion>


      </Container>
    </div>
  );
};

export default ProfileListings;