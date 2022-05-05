import React, {useEffect, useState} from 'react';
import {Card, Container, Tab, Tabs} from "react-bootstrap";
import "../../styles/ProfilePage.scss";
import {api} from "../../helpers/api";
import ProfileDetails from "./ProfileDetails";
import {useParams} from "react-router-dom";
import ProfileApplications from "./applications/ProfileApplications";
import ProfileListings from "./listings/ProfileListings";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const { id } = useParams();

    const getUser = async () => {

        // TODO: correct when backend is ready

        setLoading(false);
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
        setLoading(false);
    };

    useEffect(() => {
        getUser().catch(console.error);
    }, []);


    return (
        <Container className="d-flex justify-content-center">
            <Card className="profile-card">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Profile Details">
                        {loading ? <div>Loading...</div> : <ProfileDetails user={user ? user : null}/>}
                    </Tab>
                    <Tab eventKey="applications" title="My Applications">
                        <ProfileApplications />
                    </Tab>
                    <Tab eventKey="listings" title="My Listings">
                        <ProfileListings />
                    </Tab>
                </Tabs>

            </Card>
        </Container>
    );
};

export default ProfilePage;