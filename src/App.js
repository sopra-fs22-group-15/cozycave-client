import React from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";


const App = () => {

    return (
        <>
            <Navbar style="transparent" brandName="Cozy Cave"/>
            <LandingPage/>
        </>
    )
}

export default App;
