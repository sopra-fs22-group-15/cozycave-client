import React from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";
import ResultsPage from './ResultsPage';
import AdOverviewPage from './AdOverviewPage';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import CreateAd from "./components/crud/CreateAd";
import ProfilePage from "./components/profile/ProfilePage";



const App = () => {
    return (
        <Router>
            <Navbar brandName="Cozy Cave" />
            <Routes>
                <Route exact path="/" element={<LandingPage/>} />
                <Route exact path="/overview" element={<ResultsPage/>} />
                <Route path="/profile-page/1" element={<ProfilePage/>}/>
                <Route path="/listings/:id" element={<AdOverviewPage/>}/>
                <Route path="/create-listing" element={<CreateAd/>}/>
                
            </Routes>
        </Router>
    )
}

export default App;
