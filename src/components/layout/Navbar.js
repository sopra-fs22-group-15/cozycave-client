import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import SearchBar from "../../SearchBar";
import LoginForm from "../../LoginForm.js";
import RegisterForm from "../../RegisterForm.js";
import {Dropdown} from "react-bootstrap";


/**
 * Customizable Navbar component.
 * @component
 * @example
 *<Navbar style="transparent" brandName="Cozy Cave"/>
 */



// TODO: change navbar content when user is not on landing page.

const AvatarToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <img src="https://www.placecage.com/c/300/300" alt="profile" className="rounded-circle"
             height="50"/>
        {children}
    </a>
));

const Navbar = props => {
    const [loginIsOpen, setLoginIsOpen] = useState(false)
    const [registerIsOpen, setRegisterIsOpen] = useState(false)
    //The following two functions are passed down to the modals as props, and handle the display/hide behavior
    
    const hideLogin = () => {
        setLoginIsOpen(false)
    }
    const hideRegister = () => {
        setRegisterIsOpen(false)
    }
    // TODO: make dynamic with store according to actual login status
    let loggedInStatus = !localStorage.getItem('token')

    const authInputGroup = (
        <div className="d-flex">
            <Button type="button" onClick={() => setLoginIsOpen(!loginIsOpen)} outlined={true} variant="primary"
                    opts="me-2">Sign In</Button>
            <Button type="button" onClick={() => setRegisterIsOpen(!registerIsOpen)} variant="primary">Sign Up</Button>
        </div>
    )

    const navContent = !loggedInStatus || !props.isLandingPage ? (
        authInputGroup
    ) : (
        // TODO: implement custom navbar to change when logged in.
        // TODO: implement custom dropdown with speech bubble shape
        <div className="d-flex">
            <SearchBar style="nav-search"/>



            <Dropdown>
                <Dropdown.Toggle as={AvatarToggle} align={{ lg: 'end' }} id="dropdown-menu-align-responsive-2">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={`/profile-page/${localStorage.getItem('id') ? localStorage.getItem('id') : 1}`}>My Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">Manage Group</Dropdown.Item>
                </Dropdown.Menu>

                
            </Dropdown>


        </div>
    )

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-light bg-${props.style} justify-content-between fixed-top`}>
                <div className="container-fluid flex-nowrap">
                    <a className="navbar-brand">
                        {props.brandName}
                        <img src="/assets/cozy_cave_logo_v1.svg" alt="logo" className="d-inline-block align-text-top"
                             width="50" height="32"/>
                    </a>
                    <div className={`${loggedInStatus && props.isLandingPage ? "container-fluid" : "d-flex"}`}>
                        {navContent}
                    </div>
                </div>
            </nav>
            <LoginForm loginOpen={loginIsOpen} hideLogin={hideLogin}/>
            <RegisterForm registerOpen={registerIsOpen} hideRegister={hideRegister}/>
        </div>
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
