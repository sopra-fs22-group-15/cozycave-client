import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import LoginForm from "../../LoginForm.js";
import RegisterForm from "../../RegisterForm.js";
import {Col, Dropdown, Form, FormControl, Row} from "react-bootstrap";
import "../../styles/Navbar.scss";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";
import SearchBar from "../../SearchBar";


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

    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

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
            <>
                <Col md={9}>

                    <Form className="nav-search">
                        <SearchBar/>
                    </Form>
                </Col>
                <Col lg={2} md={1}>
                    <Dropdown>
                        <Dropdown.Toggle as={AvatarToggle} align={{lg: 'end'}}
                                         id="dropdown-menu-align-responsive-2">
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
                </Col>
            </>
        )
    } else {
        navContent = authInputGroup
    }


    return (
        <div>
            <nav
                className={`d-flex flex-wrap navbar navbar-expand-lg navbar-light ${isLandingPage ? "bg-transparent" : "navbar-custom"} justify-content-between fixed-top`}>
                <div className="container-fluid flex-nowrap row">
                    <Col md={2}>
                        <a href="/overview" onClick={(e) => {
                            handleNavigate("/overview", e)
                        }} className="navbar-brand">
                            {props.brandName}
                            <img src="/assets/cozy_cave_logo_v1.svg" alt="logo"
                                 className="d-inline-block align-text-top"
                                 width="50" height="32"/>
                        </a>
                    </Col>
                        <div className={`${!auth.isLoggedIn && isLandingPage ? "" : "d-flex"}`}>
                            {navContent}
                        </div>

                </div>
                {!isLandingPage && (
                    <div className="navbar-filter-area container-fluid">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="Zurich, 8006"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Price range</Form.Label>
                                        <Form.Control type="text" placeholder="CHF 1'000 - 2'000"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Gender preference</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option
                                                defaultValue={auth.isLoggedIn && user ? user.details.gender : "Choose your preference"}
                                            >{auth.isLoggedIn && user ? user.details.gender : "Choose your preference"}</option>
                                            <option value="1">MALE</option>
                                            <option value="2">FEMALE</option>
                                            <option value="3">BOTH</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Filters</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option selected>See more</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                )}
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
