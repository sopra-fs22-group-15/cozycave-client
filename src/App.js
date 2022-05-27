import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import LandingPage from "./LandingPage";
import ResultsPage from './ResultsPage';
import AdOverviewPage from './AdOverviewPage';
import {AuthContext} from "./context/auth-context";
import {GatherContext} from './context/gather-context';
import {FilterContext} from "./context/filter-context";
import ForeignViewProfile from './components/profile/ForeignViewProfile';

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import CreateAd from "./components/crud/CreateAd";
import ProfilePage from "./components/profile/ProfilePage";
import EditListing from "./components/crud/EditListing";
import GatherTogetherPage from './GatherTogetherPage';
import {api, handleError} from "./helpers/api";
import {Spinner} from "react-bootstrap";
import {queryStringBuilder} from "./components/util/queryStringBuilder";

// TEST DEPLOYMENT TO HEROKU


const App = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [searchStarted, setSearchStarted] = useState(false);
    const [reRenderGather, setReRenderGather] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [gender, setGender] = useState("");
    const [minSqm, setMinSqm] = useState(0);
    const [maxSqm, setMaxSqm] = useState(0);
    const [listingType, setListingType] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [listings, setListings] = useState([]);

    const login = useCallback((responseUser, responseToken) => {
        setToken(responseToken);
        setUserId(responseUser.id);
        localStorage.setItem('token', responseToken);
        localStorage.setItem('firstname', responseUser.details.first_name);
        localStorage.setItem('lastname', responseUser.details.last_name);
        localStorage.setItem('gender', responseUser.details.gender);
        localStorage.setItem('user', JSON.stringify(responseUser));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.clear();
    }, []);


    const requestResults = async () => {
        if (city === "" && minPrice === 0 && maxPrice === 0 && gender === "" && listingType === "" && zipCode === "" && minSqm === 0 && maxSqm === 0) {
            try {
                setIsLoading(true)
                const response = await api.get('/listings');
                setListings(response.data.filter(listing => listing.published === true));
                setIsLoading(false);
            } catch (error) {
                alert(`Something went wrong during the registration: \n${handleError(error)}`);
                // TODO: Remove mock listings when API is ready
                setIsLoading(false);
            }
        } else {
            try {
                setIsLoading(true);
                let queryString = queryStringBuilder({
                    "CITY": city,
                    "MAX_RENT": maxPrice,
                    "MIN_RENT": minPrice,
                    "AVAILABLE_TO": gender,
                    "ZIP_CODE": zipCode,
                    "MIN_SQM": minSqm,
                    "MAX_SQM": maxSqm,
                    "LISTING_TYPE": listingType
                });
                // Get the returned listings, create new objects for each.
                const response = await api.get(`/listings${queryString}`);
                // setListings([]);
                setListings(response.data.filter(listing => listing.published === true));
                setIsLoading(false);
            } catch (error) {
                alert(`Something went wrong \n${handleError(error)}`);
            }
        }
    }

    const setFilter = useCallback((name, value) => {
        if (name === 'city') {
            setCity(value);
        } else if (name === 'minPrice') {
            setMinPrice(value);
        } else if (name === 'maxPrice') {
            setMaxPrice(value);
        } else if (name === 'gender') {
            setGender(value)
        } else if (name === "minSqm") {
            setMinSqm(value);
        } else if (name === "maxSqm") {
            setMaxSqm(value);
        } else if (name === "listingType") {
            setListingType(value);
        } else if (name === "zipCode") {
            setZipCode(value);
        }
    }, [])

    const clearFilters = useCallback(() => {
        setCity("");
        setMinPrice(0);
        setMaxPrice(0);
        setGender("");
        setMinSqm(0);
        setMaxSqm(0);
        setListingType("");
        setZipCode("");
    }, [])

    useEffect(() => {

        requestResults();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            login(storedUser, storedToken);
        }
    }, [login]);

    return (
        <AuthContext.Provider value={
            {
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }
        }>
            <GatherContext.Provider value={
                {
                    searchStarted,
                    reRenderPage: reRenderGather,
                    setSearchStarted,
                    setReRenderPage: setReRenderGather
                }
            }>
                <Router>
                    <FilterContext.Provider value={
                        {
                            city: city,
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                            gender: gender,
                            setFilter: setFilter,
                            clearFilters: clearFilters,
                            minSqm: minSqm,
                            maxSqm: maxSqm,
                            listingType: listingType,
                            zipCode: zipCode
                        }
                    }>
                        <Navbar requestFilteredResults={requestResults} brandName="Cozy Cave"/>
                        <Routes>
                            <Route exact path="/" element={<LandingPage/>}/>
                            <Route exact path="/overview" element={isLoading ? (
                                <div className="center-middle">
                                    <Spinner animation="border" variant="primary"/>
                                </div>
                            ) : (
                                <ResultsPage requestResults={requestResults} listings={listings}/>
                            )}/>
                            <Route path="/profile-page/:id" exact element={<ProfilePage/>}/>
                            <Route path="/listings/:id" element={<AdOverviewPage/>}/>
                            <Route path="/create-listing" element={<CreateAd/>}/>
                            <Route path="/edit-listing/:id" element={<EditListing/>}/>
                            <Route path="/view-profile/:id" element={<ForeignViewProfile openAsOwnPage={true}/>}/>
                            <Route exact path="/gather-together" element={<GatherTogetherPage/>}/>
                        </Routes>
                    </FilterContext.Provider>
                </Router>
            </GatherContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;
