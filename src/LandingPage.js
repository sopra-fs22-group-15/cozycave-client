import React from "react";
import "./styles/LandingPage.scss"
import SearchBar from "./SearchBar";

const LandingPage = () => {
    return (
        <section className="landing-page-bg">
            <div className="hero-content">
                <img src="/assets/cozy_cave_logo_v1.svg" alt="logo" className="logo img-fluid" />
                <h1 className="mb-5">Find a cozy new place to call home.</h1>
                <SearchBar/>
            </div>
        </section>
    )
}

export default LandingPage;
