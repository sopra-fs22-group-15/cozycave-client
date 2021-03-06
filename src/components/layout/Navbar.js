import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "../util/Button.js"
import PropTypes from "prop-types";
import LoginForm from "../../LoginForm.js";
import RegisterForm from "../../RegisterForm.js";

import {Dropdown, Form, Row, Col} from "react-bootstrap";
import "../../styles/Navbar.scss";
import SearchBar from "../../SearchBar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";
import ResetPasswordForm from "../../ResetPasswordForm.js";
import {LoginContext} from "../../context/login-context.js";
import {GatherContext} from "../../context/gather-context.js";
import {FilterContext} from "../../context/filter-context";
import {priceRangeStringBuilder} from "../util/priceRangeBuilder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import GatherTogetherDetails from "../profile/GatherTogetherDetails.js";
import GatherTogetherRequest from "../profile/GatherTogetherRequest.js";
import {displayPictures} from "../../helpers/displayPictures";


/**
 * Customizable Navbar component.
 * @component
 * @example
 *<Navbar style="transparent" brandName="Cozy Cave"/>
 */


// TODO: change navbar content when user is not on landing page.


const Navbar = props => {

    const auth = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState("");
    const {user, getUser, requestFilteredResults} = props

    const AvatarToggle = React.forwardRef(({onClick}, ref) => (
        <a
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            <img src={user ? user.details.picture.picture_url : profilePicture} alt="profile" className="rounded-circle"
                 height="40" width="40"/>
        </a>
    ));

    // console.log(auth.user.details.picture.picture_url);

    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [isLandingPage, setIsLandingPage] = useState(true);
    const [isOverviewPage, setIsOverviewPage] = useState(false);
    const [resetIsOpen, setResetIsOpen] = useState(false);
    const [resetToast, setResetToast] = useState(false);

    const [cityFilter, setCityFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("BOTH");
    const [minPriceFilter, setMinPriceFilter] = useState(null);
    const [maxPriceFilter, setMaxPriceFilter] = useState(null);
    const [listingTypeFilter, setListingTypeFilter] = useState("");
    const [minSqmFilter, setMinSqmFilter] = useState(0);
    const [maxSqmFilter, setMaxSqmFilter] = useState(0);
    const [zipCodeFilter, setZipCodeFilter] = useState("");

    const navigate = useNavigate();

    const gatherTogether = useContext(GatherContext);
    const filter = useContext(FilterContext);

    const handleLogout = () => {
        auth.logout();
        navigate("/overview");
    };

    const handleNavigate = (path, e, func) => {
        e.preventDefault();
        navigate(path, func);
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsLandingPage(true);
        } else {
            setIsLandingPage(false);
        }
    }, [auth.isLoggedIn, filter, auth.user]);
    //The following two functions are passed down to the modals as props, and handle the display/hide behavior

    const hideLogin = () => {
        setLoginIsOpen(false)
    }
    const hideRegister = () => {
        setRegisterIsOpen(false)
    }

    const showResetSuccess = () => {
        setLoginIsOpen(true)
        setResetToast(true)
    }

    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        if (name === "city") {
            setCityFilter(value);
            filter.setFilter(name, value);
        } else if (name === "gender") {
            setGenderFilter(value);
            filter.setFilter(name, value);
        } else if (name === "minPrice") {
            setMinPriceFilter(value);
            filter.setFilter(name, value);
        } else if (name === "maxPrice") {
            setMaxPriceFilter(value);
            filter.setFilter(name, value);
        } else if (name === "minSqm") {
            setMinPriceFilter(value);
            filter.setFilter(name, value);
        } else if (name === "maxSqm") {
            setMaxSqmFilter(value);
            filter.setFilter(name, value);
        } else if (name === "listingType") {
            setListingTypeFilter(value);
            filter.setFilter(name, value);
        } else if (name === "zipCode") {
            setZipCodeFilter(value);
            filter.setFilter(name, value);
        } else if (name === "search") {
            filter.setFilter(name, value);
        }
    }

    const applyFilters = e => {
        e.preventDefault()
        props.requestFilteredResults()
        // filter.clearFilters();
    }

    const resetFilters = e => {
        filter.clearFilters();
        if (filter.search === "" && filter.city === "" && filter.gender === "" && filter.minPrice === 0 && filter.maxPrice === 0 && filter.listingType === "" && filter.zipCode === "" && filter.minSqm === 0 && filter.maxSqm === 0) {
            applyFilters(e)
        }
    }

    // TODO: make dynamic with store according to actual login status

    const authInputGroup = (
        <>
            {!isLandingPage ? (
                <div className="d-flex">
                    <Button type="button" onClick={() => setLoginIsOpen(!loginIsOpen)}
                            outlined={true} variant="primary"
                            opts="me-2">Sign In</Button>
                    <Button type="button" onClick={() => setRegisterIsOpen(!registerIsOpen)} variant="primary">Sign
                        Up</Button>
                </div>
            ) : (
                <>
                    <Button variant='info' outlined={true} opts='me-2' onClick={() => navigate('/read-me')}>Read
                        Me</Button>
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
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle as={AvatarToggle} align={{lg: 'end'}}
                                         id="dropdown-menu-align-responsive-2">
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="d-flex flex-column justify-content-center">
                            <Dropdown.Item
                                href={`/profile-page/${JSON.parse(localStorage.getItem("user")).id}/me`}>My
                                Profile</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                href={`/profile-page/${JSON.parse(localStorage.getItem("user")).id}/listings`}>
                                My Listings
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                href={`/profile-page/${JSON.parse(localStorage.getItem("user")).id}/applications`}>
                                My Applications
                            </Dropdown.Item>
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
    useEffect(() => {
        setIsLandingPage(false);
        if (window.location.pathname === "/") {
            setIsLandingPage(true);
        } else if (window.location.pathname !== "/overview") {
            setIsLandingPage(false);
            setIsOverviewPage(false);
        } else {
            setIsLandingPage(false);
            setIsOverviewPage(true);
        }
        //setProfilePicture(user.details.picture.picture_url);
        setTimeout(() => {
            if (auth.isLoggedIn) {
                getUser();
            }
        }, 1000)
    }, [isLandingPage, isOverviewPage, auth.isLoggedIn, navigate, minPriceFilter]);

    return (
        <div>
            <LoginContext.Provider value={
                {
                    loginOpen: loginIsOpen,
                    resetOpen: resetIsOpen,
                    setReset: setResetIsOpen,
                    displaySuccess: showResetSuccess
                }
            }>

                <nav
                    className={`d-flex navbar flex-wrap navbar-expand-lg navbar-light ${isLandingPage ? "bg-transparent" : "navbar-custom"} justify-content-between fixed-top`}>
                    <div className="container-fluid navbar-not-overview">
                        <div className="row">
                            <Col style={{marginRight: "1.4rem"}}>
                                <a href="/overview" onClick={(e) => {
                                    handleNavigate("/overview", e, requestFilteredResults())
                                }} className="navbar-brand">
                                    {props.brandName}
                                    <img src="/assets/cozy_cave_logo_v1.svg" alt="logo"
                                         className="d-inline-block align-text-top"
                                         width="50" height="32"/>
                                </a>
                            </Col>
                            {!isLandingPage && (
                                <Col className="nav-search">
                                    <Form className="nav-search">
                                        <SearchBar requestFilteredResults={props.requestFilteredResults}/>
                                    </Form>
                                </Col>
                            )}

                            {auth.isLoggedIn && !isLandingPage && (
                                <Col style={{paddingLeft: '2rem'}}>
                                    <Button variant={gatherTogether.searchStarted ? 'success' : 'danger'}
                                        //button color based on whether connection is open
                                            onClick={() => {
                                                navigate("/gather-together");
                                            }}>Gather Together</Button>

                                </Col>
                            )}

                        </div>
                        <div className={`${auth.isLoggedIn && isLandingPage ? "" : "d-flex"}`}>
                            {navContent}
                        </div>

                    </div>
                    {!isLandingPage && isOverviewPage && (
                        <div className="navbar-filter-area container-fluid">
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control value={filter.city} name="city" type="text"
                                                          placeholder="Zurich"
                                                          onChange={e => handleChange(e)} on/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Price range</Form.Label>
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle className="price-range-dropdown"
                                                                 id="dropdown-autoclose-inside">
                                                    {filter.minPrice || filter.maxPrice ? priceRangeStringBuilder(filter.minPrice, filter.maxPrice) : "Please choose"}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <Form.Label>min. Price</Form.Label>
                                                        <Form.Control value={filter.minPrice} name="minPrice"
                                                                      type="text" placeholder="CHF 1000"
                                                                      onChange={e => handleChange(e)}/>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Form.Label>max. Price</Form.Label>
                                                        <Form.Control value={filter.maxPrice} name="maxPrice"
                                                                      type="text" placeholder="CHF 1000"
                                                                      onChange={e => handleChange(e)}/>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Gender preference</Form.Label>
                                            <Form.Select name="gender" aria-label="Default select example"
                                                         onChange={e => handleChange(e)}>
                                                <option selected disabled hidden
                                                        defaultValue={auth.isLoggedIn && user ? user.details.gender : "Choose your preference"}
                                                >Please choose
                                                </option>
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="both">Both</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Filters</Form.Label>
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle className="price-range-dropdown"
                                                                 id="dropdown-autoclose-inside">
                                                    See more filters
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu style={{width: "300%"}}>
                                                    <Row style={{padding: "10px"}}>
                                                        <Col>
                                                            <Form.Label>Zip Code</Form.Label>

                                                            <Form.Control value={filter.zipCode} name="zipCode"
                                                                          type="text" placeholder="8000"
                                                                          onChange={e => handleChange(e)}/>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label>Listing Type</Form.Label>

                                                            <Form.Select value={filter.listingType} name="listingType"
                                                                         type="text" placeholder="Flat"
                                                                         onChange={e => handleChange(e)}>
                                                                <option selected disabled hidden
                                                                        defaultValue="Choose your preference"
                                                                >Please choose
                                                                </option>
                                                                <option value="FLAT">Flat</option>
                                                                <option value="HOUSE">House</option>
                                                                <option value="ROOM">Room</option>
                                                            </Form.Select>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{padding: "10px"}}>
                                                        <Col>
                                                            <Form.Label>max. m??</Form.Label>

                                                            <Form.Control value={filter.minSqm} name="minSqm"
                                                                          type="text" placeholder="80 m??"
                                                                          onChange={e => handleChange(e)}/>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label>min. m??</Form.Label>

                                                            <Form.Control value={filter.maxSqm} name="maxSqm"
                                                                          type="text" placeholder="200 m??"
                                                                          onChange={e => handleChange(e)}/>
                                                        </Col>
                                                    </Row>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Col>
                                    <Col className="d-flex align-items-end" style={{maxWidth: "50px"}}>
                                        <Button variant="dark" onClick={resetFilters}>
                                            <span><FontAwesomeIcon icon={faTimes}/></span>
                                        </Button>
                                    </Col>
                                    <Col className="d-flex align-items-end">
                                        <Button variant="success" onClick={applyFilters}>
                                            Apply Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )}
                </nav>
                <LoginForm resetToast={resetToast} setResetToast={setResetToast} loginOpen={loginIsOpen}
                           hideLogin={hideLogin}/>
                <RegisterForm registerOpen={registerIsOpen} hideRegister={hideRegister}/>
                <ResetPasswordForm resetOpen={resetIsOpen} hideReset={() => setResetIsOpen(false)}/>
                {gatherTogether.showDetails ? <GatherTogetherDetails user={gatherTogether.showDetails}/> : ''}
                {(gatherTogether.showRequest && !gatherTogether.showDetails) ?
                    <GatherTogetherRequest user={gatherTogether.showRequest}/> : ''}
            </LoginContext.Provider>
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
