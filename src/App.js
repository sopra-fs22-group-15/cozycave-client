import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";
import ResultsPage from './ResultsPage';
import AdOverviewPage from './AdOverviewPage';
import {AuthContext} from "./context/auth-context";

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
        const storedData = JSON.parse(localStorage.getItem('user'));
        if (storedData && storedData.token) {
            login(storedData.id, storedData.token);
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
                    <Route path="/profile-page/:id" element={<ProfilePage/>}/>
                    <Route path="/listings/:id" element={<AdOverviewPage/>}/>
                    <Route path="/create-listing" element={<CreateAd/>}/>
                    <Route path="/edit-listing/:id" element={<EditListing/>}/>

                </Routes>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
