import { Row, Col, Container, Stack, Spinner, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { api, handleError } from './helpers/api'
import { mockParticipants } from './components/util/mockParticipants';
import { GatherContext } from './context/gather-context';
import {toast, ToastContainer} from 'react-toastify';

const GatherTogetherPage = () => {
    const {searchStarted, reRenderPage, setSearchStarted, setReRenderPage} = useContext(GatherContext);
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const toggleSearch = () => {
        if (!searchStarted) {
            setSearchStarted(true);
            requestResults();
            toast.info('Others will now see you on their list')
            
        } else {
            setSearchStarted(false);
            setParticipants([]);
            //TODO: end connection
        }
        toast.info("You can click on the Gather Together button to toggle your visibility")
    }

    const requestResults = async () => { //TODO: websocket magic here
        try {
            //response = await api.get('/users');
            //setParticipants(response.data);
            setParticipants(mockParticipants);
        } catch (error) {
            alert(`Something went wrong when establishing connection to the server: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        if(reRenderPage){
            requestResults();
            toast.info('Others will now see you on their list')
            setReRenderPage(false);
        }else if(!searchStarted){
            //TODO: end connection here
            setParticipants([]);
        }

    }, [searchStarted, reRenderPage]);

    return (
        <Container fluid={true}>
            <Container style={{ maxWidth: '75%', alignContent: 'center', alignItems: 'center', marginTop: '5rem' }}>
                {searchStarted ?
                    <Row>
                        <h5>
                            Connect with prospective flatmates here:
                        </h5>
                        <hr />
                        {participants.length > 0 ?
                            <Stack direction='vertical' gap={2}>
                                {participants.map((participant, index) => {
                                    return (
                                        <Row md={2} className='border border-info rounded mb-0'>
                                            <Col style={{ width: '20%', padding: '0' }}>
                                                <Image fluid={true} rounded={true} src={participant.details.picture.picture_url} />
                                            </Col>
                                            <Col style={{ width: '80%', minHeight: '100%' }}>
                                                <Stack direction='horizontal'>
                                                    <h4>{participant.details.first_name} {participant.details.last_name}</h4>
                                                    <h5 className='ms-auto'>{participant.details.address.city}</h5>
                                                </Stack>
                                                <Stack direction='vertical'>
                                                    <h6 style={{ opacity: '0.8' }}>Gender: {participant.details.gender} </h6>
                                                    <p style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                                                        {participant.details.biography}</p>
                                                    <Button variant='success' className='ms-auto'>Request Contact Details</Button>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    )
                                })}

                                <ToastContainer />
                            </Stack>

                            : (


                                <div className='center-middle'>
                                    <Spinner animation="border" variant="primary" />
                                </div>


                            )}
                    </Row> :
                    <div className='center-middle'><Button variant='primary' onClick={() => toggleSearch()}>
                        Connect with prospective roommates
                    </Button></div>}
            </Container>
        </Container>
    );
};

export default GatherTogetherPage;