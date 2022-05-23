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
import { api } from '../../../helpers/api';


const ProfileApplications = props => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([])
    let response = null;
    const user = JSON.parse(localStorage.getItem('user'))

    const requestResults = async () => {
        try {
            response = await api.get(`/users/${user.id}/applications`);
            setApplications(response)
            console.log(response.data)
        } catch (error) {
            alert(`Something went wrong during retrieval of your applications: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        requestResults();
    }, [applications]);

    return (
        <Container>
            <Row>
                <Col>
                    <h5>
                        Manage your applications:
                    </h5>
                    <hr />
                </Col>
            </Row>
            {applications.length > 0 ? <ProfileApplicationsList applications={applications} getApplications={requestResults}/> : (
                <Row>
                    <Col>
                        <h6 style={{color: "#a9a9a9"}}>
                            Wow, such empty! Apply to some listings to view your applications here
                        </h6>
                    </Col>
                </Row>
            )}
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