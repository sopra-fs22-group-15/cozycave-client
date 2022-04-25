import React from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import ProfilePage from "./ProfilePage";


const App = () => {

    return (
        <Router>
            <Navbar style="transparent" brandName="Cozy Cave" isLandingPage={true}/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/profile-page/1" element={<ProfilePage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
