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


const App = () => {

    return (
        <Router>
            <Navbar style="transparent" brandName="Cozy Cave"/>
            <Routes>
                <Route path="/overview" element={<ResultsPage/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/listings/:id" element={<AdOverviewPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
