import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import LoginForm from "../../LoginForm.js";
import RegisterForm from "../../RegisterForm.js";
import {Dropdown, Form, FormControl} from "react-bootstrap";
import "../../styles/Navbar.scss";
import {useNavigate} from "react-router-dom";


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
             height="40"/>
        {children}
    </a>
));

const Navbar = props => {
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [isLandingPage, setIsLandingPage] = useState(true);
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/overview");
    };

    const handleNavigate = (path, e) => {
        e.preventDefault();
        navigate(path);
        setIsLandingPage(false)
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsLandingPage(true);
        } else {
            setIsLandingPage(false);
        }
    }, [window.location.pathname, loggedIn]);
    //The following two functions are passed down to the modals as props, and handle the display/hide behavior

    const hideLogin = () => {
        setLoginIsOpen(false)
    }
    const hideRegister = () => {
        setRegisterIsOpen(false)
    }


    // TODO: make dynamic with store according to actual login status

    const authInputGroup = (
        <>
            {!isLandingPage ? (
                <div className="d-flex">
                    <Form className="nav-search">
                        <FormControl type="search" placeholder="Find what you're looking for ... " className="mr-sm-2"/>
                    </Form>
                    <Button type="button" onClick={() => setLoginIsOpen(!loginIsOpen)} outlined={true} variant="primary"
                            opts="me-2">Sign In</Button>
                    <Button type="button" onClick={() => setRegisterIsOpen(!registerIsOpen)} variant="primary">Sign
                        Up</Button>
                </div>
            ) : (
                <>
                    <Button type="button" onClick={() => setLoginIsOpen(!loginIsOpen)} outlined={true} variant="primary"
                            opts="me-2">Sign In</Button>
                    <Button type="button" onClick={() => setRegisterIsOpen(!registerIsOpen)} variant="primary">Sign
                        Up</Button>
                </>
            )}
        </>
    )

    const navContent = !loggedIn ? (
        authInputGroup
    ) : (
        // TODO: implement custom navbar to change when logged in.
        // TODO: implement custom dropdown with speech bubble shape
        <div className="d-flex">
            <Form className="nav-search">
                <FormControl type="search" placeholder="Find what you're looking for ... " className="mr-sm-2"/>
            </Form>
            <Dropdown>
                <Dropdown.Toggle as={AvatarToggle} align={{lg: 'end'}} id="dropdown-menu-align-responsive-2">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        href={`/profile-page/${localStorage.getItem('id') ? localStorage.getItem('id') : 1}`}>My
                        Profile</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#/action-3">Manage Group</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item>
                        <Button variant="outline-secondary" onClick={handleLogout}>Log out</Button>{' '}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

    return (
        <div>
            <nav
                className={`navbar navbar-expand-lg navbar-light ${isLandingPage ? "bg-transparent" : "navbar-custom"} justify-content-between fixed-top`}>
                <div className="container-fluid flex-nowrap">
                    <a href="/overview" onClick={(e) => {
                        handleNavigate("/overview", e)
                    }} className="navbar-brand">
                        {props.brandName}
                        <h1 style={{color: "red"}}>PLS DO NOT TEST UNTIL THE WEEKEND :)</h1>
                        <img src="/assets/cozy_cave_logo_v1.svg" alt="logo"
                             className="d-inline-block align-text-top"
                             width="50" height="32"/>
                    </a>
                    <div className={`${!loggedIn && isLandingPage ? "" : "d-flex"}`}>
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
