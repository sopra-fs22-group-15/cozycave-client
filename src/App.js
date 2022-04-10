import React from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";


const App = () => {

    return (
        <Router>
            <Navbar style="transparent" brandName="Cozy Cave"/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
