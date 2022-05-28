import { Row, Col, Container, Stack, Spinner, Image, Button, CloseButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import { mockParticipants } from './components/util/mockParticipants';
import { GatherContext } from './context/gather-context';
import { toast, ToastContainer } from 'react-toastify';

const GatherTogetherPage = () => {
    const { searchStarted, setSearchStarted } = useContext(GatherContext);
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const ws = new WebSocket('wss://ws.link'); //set link 


    const toggleSearch = () => {
        if (!searchStarted) {
            setSearchStarted(true);
            toast.info(`Connection started, don't forget to press the close button when done`)

        } else {
            setSearchStarted(false);
            setParticipants([]);
            toast.warn('Connection stopped')
        }
    }

    const startCall = {
        event: 'bts:subscribe',
        data: { channel: 'order_book_btcusd' }, //set stuff
    };

    const requestContactDetails = (id) => {
        ws.send('request contact details');
        toast.success('Requested contact details');
    }


    useEffect(() => {
        if (searchStarted) {
            ws.onopen = (event) => {
                ws.send(JSON.stringify(startCall));
            };
            ws.onmessage = function (event) {
                const json = JSON.parse(event.data);
                try {
                    if ((json.event == 'data')) {
                        setParticipants(json.data.participants);
                    } else if (json.event == 'request') { //set event
                        //show prompt to user
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            ws.onclose = function (event) {
                if (event.wasClean) {
                    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    //server process killed / network down (1006)
                    alert(`[close] Connection died, event code=${event.code}`);
                }
            }
        }
        if (ws.readyState === WebSocket.OPEN) {
            return () => ws.close(); //clean up function to prevent multiple websocket instances
        }
    }, [searchStarted]);

    return (
        <Container fluid={true}>
            <Container style={{ maxWidth: '75%', alignContent: 'center', alignItems: 'center', marginTop: '5rem' }}>
                {searchStarted ?
                    <Row>
                        <Stack direction='horizontal'>
                            <h5>
                                Connect with prospective flatmates here:
                            </h5>
                            <CloseButton className='ms-auto' aria-label="Hide" onClick={() => toggleSearch()} />
                        </Stack>
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
                                                    <Button variant='success' className='ms-auto'
                                                        onClick={() => requestContactDetails}>Request Contact Details</Button>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    )
                                })}


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
            <ToastContainer />
        </Container>
    );
};

export default GatherTogetherPage;