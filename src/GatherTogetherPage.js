import { Row, Col, Container, Stack, Spinner, Image, Button, CloseButton, ToastHeader } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { mockParticipants } from './components/util/mockParticipants';
import { GatherContext } from './context/gather-context';
import { toast, ToastContainer } from 'react-toastify';

const GatherTogetherPage = () => {
    const { searchStarted, setSearchStarted, showRequest, setShowRequest,
        showDetails, setShowDetails, sendRequest, setSendRequest, showDeniedToast } = useContext(GatherContext);
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([])
    let intermediateParticipants = [];
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'));

    const socket = useRef(null);

    const toggleSearch = () => {
        if (!searchStarted) {
            setSearchStarted(true);
            toast.info(`Connection started, don't forget to press the close button when done`)

        } else {
            setSearchStarted(false);
            intermediateParticipants = [];
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
                try {
                    if (json.action_id === 9) {
                        intermediateParticipants=json.data;
                        setParticipants(json.data); //set users on joining
                    } else if (json.action_id === 8) { //request denied
                        let obj = intermediateParticipants.find(participant => participant.id===json.data.uuid)
                        if(obj){
                            showDeniedToast(obj)
                        }

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
                        intermediateParticipants = arr;
                        setParticipants(arr)

                    } else if (json.action_id === 1) { //new user
                        let arr = participants.slice();
                        arr.push(json.data);
                        intermediateParticipants = arr;
                        setParticipants(arr);
                    } else if (json.action_id === 1001){
                        toast.warn('Unknown action. Not sure how that happened')

                    } else if (json.action_id === 1002){
                        toast.warn('Unauthorized. You need a student account for this')
                        
                    } else if (json.action_id === 1003){
                        toast.warn('Invalid data')
                        
                    } else if (json.action_id === 1004){
                        toast.warn('Already connected')
                        
                    } else if (json.action_id === 1005){
                        toast.warn('User not in list. Try reloading the page')
                        
                    } else if (json.action_id === 1006){
                        toast.warn(`You've already sent a request to this user`)
                        
                    } else if (json.action_id === 1007){
                        toast.warn('Internal server error. Whoops!')
                        
                    } else if (json.action_id === 1008){
                        toast.warn('Requested user has ended their connection')
                        
                    } else if (json.action_id === 1009){
                        toast.warn(`There was a request, but we can't find it :(`)
                        
                    } else if (json.action_id === 1010){
                        toast.warn('Unauthorized. You need a student account for this')
                    }
                } catch (err) {
                    toast.warn(err);
                    
                }
            };
            socket.current.onclose = function (event) {
                if (event.wasClean) {
                    toast.warn(`Connection closed`);

                } else {
                    //server process killed / network down (1006)
                    toast.warn(`Connection died`);
                }
                setSearchStarted(false);
                setParticipants([]);
                intermediateParticipants = [];
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