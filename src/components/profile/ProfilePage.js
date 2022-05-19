import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Card, Container, Spinner, Tab, Tabs} from "react-bootstrap";
import "../../styles/ProfilePage.scss";
import {api} from "../../helpers/api";
import ProfileDetails from "./ProfileDetails";
import ProfileApplications from "./applications/ProfileApplications";
import ProfileListings from "./listings/ProfileListings";
import {AuthContext} from "../../context/auth-context";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const auth = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const id = JSON.parse(localStorage.getItem("user")).id;
    const navigate = useNavigate();

    const getUser = useCallback(
        async () => {
            // TODO: correct when backend is ready
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }, [id]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/overview");
        } else {
            getUser().catch(console.error);
        }
    }, [getUser, navigate]);

    return (
        <Container className="d-flex justify-content-center">
            {user && auth.isLoggedIn ? (
                <Card className="profile-card">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="profile" title="Profile Details">
                            {loading ? <div>Loading...</div> :
                                <ProfileDetails user={user ? user : null} getUser={getUser}/>}
                        </Tab>
                        <Tab eventKey="applications" title="My Applications">
                            <ProfileApplications/>
                        </Tab>
                        <Tab eventKey="listings" title="My Listings">
                            <ProfileListings/>
                        </Tab>
                    </Tabs>
                </Card>
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{height: "50rem"}}>
                    <Spinner animation="border" variant="primary"/>
                </div>
            )}
        </Container>
    );
};

export default ProfilePage;