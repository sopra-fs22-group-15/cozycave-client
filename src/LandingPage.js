import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import "./styles/LandingPage.scss"
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import {FilterContext} from "./context/filter-context";

const LandingPage = props => {


    const navigate = useNavigate();
    return (
        <section className="landing-page-bg">
            <div className="hero-content">
                <img src="/assets/cozy_cave_logo_v1.svg" alt="logo" className="logo img-fluid" />
                <h1 className="mb-5">Find a cozy new place to call home.</h1>
                <SearchBar requestFilteredResults={props.requestFilteredResults} />
                <Button variant='primary' className='mt-4' onClick={()=> navigate('/overview')}>View All Listings</Button>
            </div>
        </section>
    )
}

export default LandingPage;
