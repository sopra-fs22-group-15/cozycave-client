import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import LoginForm from "../../LoginForm.js";
import RegisterForm from "../../RegisterForm.js";
import {Dropdown, Form, FormControl} from "react-bootstrap";
import "../../styles/Navbar.scss";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";


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

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.logout();
        navigate("/overview");
    };

    const handleNavigate = (path, e) => {
        e.preventDefault();
        navigate(path);
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsLandingPage(true);
        } else {
            setIsLandingPage(false);
        }
    }, [auth.isLoggedIn]);
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

    let navContent
    if (auth.isLoggedIn && localStorage.getItem("token") && localStorage.getItem("user")) {
        navContent = (
            <div className="d-flex">
                <Form className="nav-search">
                    <FormControl type="search" placeholder="Find what you're looking for ... " className="mr-sm-2"/>
                </Form>
                <Dropdown>
                    <Dropdown.Toggle as={AvatarToggle} align={{lg: 'end'}} id="dropdown-menu-align-responsive-2">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            href={`/profile-page/${JSON.parse(localStorage.getItem("user")).id}`}>My
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
    } else {
        navContent = authInputGroup
    }


    return (
        <div>
            <nav
                className={`navbar navbar-expand-lg navbar-light ${isLandingPage ? "bg-transparent" : "navbar-custom"} justify-content-between fixed-top`}>
                <div className="container-fluid flex-nowrap">
                    <a href="/overview" onClick={(e) => {
                        handleNavigate("/overview", e)
                    }} className="navbar-brand">
                        {props.brandName}
                        <img src="/assets/cozy_cave_logo_v1.svg" alt="logo"
                             className="d-inline-block align-text-top"
                             width="50" height="32"/>
                    </a>
                    <div className={`${!auth.isLoggedIn && isLandingPage ? "" : "d-flex"}`}>
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
