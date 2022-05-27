import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";
import ResultsPage from './ResultsPage';
import AdOverviewPage from './AdOverviewPage';
import {AuthContext} from "./context/auth-context";
import { GatherContext } from './context/gather-context';
import ForeignViewProfile from './components/profile/ForeignViewProfile';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import CreateAd from "./components/crud/CreateAd";
import ProfilePage from "./components/profile/ProfilePage";
import EditListing from "./components/crud/EditListing";
import GatherTogetherPage from './GatherTogetherPage';

// TEST DEPLOYMENT TO HEROKU


const App = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [searchStarted, setSearchStarted] = useState(false);
    const [reRenderGather, setReRenderGather] = useState(false);

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
            <GatherContext.Provider value={
                    {
                        searchStarted,
                        reRenderPage: reRenderGather,
                        setSearchStarted,
                        setReRenderPage: setReRenderGather
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
                    <Route exact path="/gather-together" element = {<GatherTogetherPage/>}/>

                </Routes>
            </Router>
            </GatherContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;
