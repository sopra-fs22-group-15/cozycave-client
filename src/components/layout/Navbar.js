import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import SearchBar from "../../SearchBar";





/**
 * Customizable Navbar component.
 * @component
 * @example
 *<Navbar style="transparent" brandName="Cozy Cave"/>
 */



// TODO: change navbar content when user is not on landing page.

const Navbar = props => {

    let loggedInStatus = false;

    const authInputGroup = (
        <div className="d-flex">
            <Button type="button" outlined={true} variant="primary" opts="me-2">Sign In</Button>
            <Button type="button" variant="primary">Sign Up</Button>
        </div>
    )

    const navContent = !loggedInStatus || !props.isLandingPage  ? (
        authInputGroup
    ) : (
        // TODO: implement custom navbar to change when logged in.
        <div className="d-flex">
            <SearchBar style="nav-search"/>
            <img src="https://www.placecage.com/c/300/300" alt="profile" className="rounded-circle" height="40"/>
        </div>





    )

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-${props.style} justify-content-between fixed-top`}>
            <div className="container-fluid flex-nowrap">
                <a className="navbar-brand">
                    {props.brandName}
                    <img src="/assets/cozy_cave_logo_v1.svg" alt="logo" className="d-inline-block align-text-top" width="50" height="32"/>
                </a>
                <div className={`${loggedInStatus && props.isLandingPage ? "container-fluid" : "d-flex"}`}>
                    {navContent}
                </div>
            </div>
        </nav>

    )
}

Navbar.propType = {
    /**
     * Choose style of Navbar, can be either "transparent", "light" or "dark".
     **/
    style: PropTypes.oneOf(["transparent", "light", "dark"]),
    /**
     * Brand text that is displayed on navbar.
     **/
    brandName: PropTypes.string,
};

export default Navbar;
