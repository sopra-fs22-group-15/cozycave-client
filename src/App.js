import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";
import ResultsPage from './ResultsPage';
import AdOverviewPage from './AdOverviewPage';
import {AuthContext} from "./context/auth-context";
import ForeignViewProfile from './components/profile/ForeignViewProfile';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import CreateAd from "./components/crud/CreateAd";
import ProfilePage from "./components/profile/ProfilePage";
import EditListing from "./components/crud/EditListing";

// TEST DEPLOYMENT TO HEROKU


const App = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((responseUser, responseToken) => {
        setToken(responseToken);
        setUserId(responseUser.id);
        localStorage.setItem('token', responseToken);
        localStorage.setItem('firstname', responseUser.details.first_name);
        localStorage.setItem('lastname', responseUser.details.last_name);
        localStorage.setItem('gender', responseUser.details.gender);
        localStorage.setItem('user', JSON.stringify(responseUser));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.clear();
    }, []);

    useEffect(()=> {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            login(storedUser, storedToken);
        }
    },[login]);

    return (
        <AuthContext.Provider value={
            {
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }
        }>
            <Router>
                <Navbar brandName="Cozy Cave"/>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route exact path="/overview" element={<ResultsPage/>}/>
                    <Route path="/profile-page/:id" exact element={<ProfilePage/>}/>
                    <Route path="/listings/:id" element={<AdOverviewPage/>}/>
                    <Route path="/create-listing" element={<CreateAd/>}/>
                    <Route path="/edit-listing/:id" element={<EditListing/>}/>
                    <Route path="/view-profile/:id" element={<ForeignViewProfile openAsOwnPage={true}/>}/> 

                </Routes>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
