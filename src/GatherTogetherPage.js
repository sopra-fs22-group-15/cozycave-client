import { Row, Col, Container, Stack, Spinner, Image, Button, CloseButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { mockParticipants } from './components/util/mockParticipants';
import { GatherContext } from './context/gather-context';
import { toast, ToastContainer } from 'react-toastify';

const GatherTogetherPage = () => {
    const { searchStarted, setSearchStarted, showRequest, setShowRequest,
        showDetails, setShowDetails, sendRequest, setSendRequest } = useContext(GatherContext);
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const socket = useRef(null);

    const toggleSearch = () => {
        if (!searchStarted) {
            setSearchStarted(true);
            toast.info(`Connection started, don't forget to press the close button when done`)

        } else {
            setSearchStarted(false);
            socket.current.close();
            setParticipants([]);
            toast.warn('Connection stopped')
        }
    }

    const requestContactDetails = (id, first_name, last_name) => {
        socket.current.send(JSON.stringify({
            action_id: 3,
            data: {
                uuid: id
            }
        }));
        toast.success(`Requested contact details from ${first_name} ${last_name}`);
    }

    useEffect(() => {
        if (searchStarted) {
            socket.current = new WebSocket(`wss://sopra-fs22-group-15-server.herokuapp.com/v1/gathertogether?token=${localStorage.getItem('token')}`);
            socket.current.onmessage = function (event) {
                const json = JSON.parse(event.data);
                console.log(json)
                try {
                    if (json.action_id === 9) {
                        setParticipants(json.data); //set users on joining
                    } else if (json.action_id === 8) { //request denied

                    } else if (json.action_id === 7 &&json.data.id!==user.id) { //request accepted, showDetails
                        setShowDetails(json.data);

                    } else if (json.action_id === 4) { //requested from user, showRequest
                        setShowRequest(json.data);

                    } else if (json.action_id === 2) { //remove user
                        let arr = participants;
                        const index = arr.indexOf(5);
                        if (index > -1) {
                            arr.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        setParticipants(arr)

                    } else if (json.action_id === 1) { //new user
                        let arr = participants.slice();
                        arr.push(json.data);
                        setParticipants(arr);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            socket.current.onclose = function (event) {
                if (event.wasClean) {
                    alert(`[close] Connection closed cleanly, code=${event.code}`);
                } else {
                    //server process killed / network down (1006)
                    alert(`[close] Connection died, event code=${event.code}`);
                }
            }
            return () => socket.current.close(); //clean up function to prevent multiple websocket instances
        }
    }, [searchStarted]);

    useEffect(() => {
        if (searchStarted && sendRequest) {
            if (sendRequest[0] === true) {
                socket.current.send(JSON.stringify({
                    action_id: 5,
                    data: {
                        uuid: sendRequest[1]
                    }
                }))
                
            } else {
                socket.current.send(JSON.stringify({
                    action_id: 6,
                    data: {
                        uuid: sendRequest[1]
                    }
                }))
                

            }
        }

    }, [sendRequest]);

    return (
        <Container fluid={true}>
            <Container style={{ maxWidth: '75%', alignContent: 'center', alignItems: 'center', marginTop: '7rem' }}>
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
                                                <h4>{participant.details.first_name} {participant.details.last_name}</h4>
                                                <Stack direction='vertical'>
                                                    <h6 style={{ opacity: '0.8' }}>Gender: {participant.details.gender} </h6>
                                                    <p style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                                                        {participant.details.biography}</p>
                                                    <Button variant='success' className='ms-auto'
                                                        onClick={
                                                            () => requestContactDetails(participant.id, participant.details.first_name, participant.details.last_name)}>
                                                        Request Contact Details</Button>
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