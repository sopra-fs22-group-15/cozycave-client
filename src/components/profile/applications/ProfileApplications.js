import {
    Button,
    Row,
    Col,
    Container,

} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { handleError } from '../../../helpers/api'
import ProfileApplicationsList from "./ProfileApplicationsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { mockApplicationsFromOneUser } from '../../util/mockApplicationsFromOneUser';


const ProfileApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([])
    let response = null;
    const user = localStorage.getItem('user')

    const requestResults = async () => {
        try {
            // TODO: change when API is ready
            //response = await api.get('/users/'+user.uuid+/applications');
            setApplications(mockApplicationsFromOneUser)
        } catch (error) {
            alert(`Something went wrong during retrieval of your applications: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        requestResults();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h5>
                        Manage listings you have applied to:
                    </h5>
                    <hr />
                </Col>
            </Row>
            <ProfileApplicationsList applications={applications} />
            <hr />
            <Row>
                <Col className="d-flex justify-content-center align-content-center">
                    <Button variant="primary" type="submit" onClick={() => { navigate("/overview") }}>
                        <span style={{ marginRight: "5px" }}>See more listings</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </Col>
            </Row>
            <hr />
        </Container>
    );
}

export default ProfileApplications;