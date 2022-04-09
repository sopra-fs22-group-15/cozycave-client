import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";


/**
 * Customizable Navbar component.
 * @component
 * @example
 *<Navbar style="transparent" brandName="Cozy Cave"/>
 */

let loggedInStatus = false;

const navContent = !loggedInStatus ? (
    <>
        <Button type="button" outlined={true} variant="primary" opts="me-2">Sign In</Button>
        <Button type="button" variant="primary">Sign Up</Button>
    </>
) : (
    // TODO: implement custom navbar to change when logged in.
    <div>
        Logged In
    </div>
)

// TODO: change navbar content when user is not on landing page.

const Navbar = props => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-${props.style} justify-content-between fixed-top`}>
            <div className="container-fluid">
                <a className="navbar-brand">
                    {props.brandName}
                </a>
                <div className="d-flex">
                    <div className="container-fluid">
                        {navContent}
                    </div>
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
