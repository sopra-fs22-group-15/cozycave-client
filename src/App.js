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
import { toast, ToastContainer } from 'react-toastify';
import ReadMe from './ReadMe';




const App = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    const [searchStarted, setSearchStarted] = useState(false);
    const [showRequest, setShowRequest] = useState(null); //these are the gather together hooks, used in context
    const [showDetails, setShowDetails] = useState(null);
    const [sendRequest, setSendRequest] = useState([]);
    const showDeniedToast = (user) => {toast.warn(`${user.details.first_name} ${user.details.last_name} denied your request :(`)}

    const [isLoading, setIsLoading] = useState(true);

    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [gender, setGender] = useState("");
    const [minSqm, setMinSqm] = useState(0);
    const [maxSqm, setMaxSqm] = useState(0);
    const [listingType, setListingType] = useState("");
    const [search, setSearch] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [listings, setListings] = useState(null);

    const login = useCallback((responseUser, responseToken) => {
        setToken(responseToken);
        setUserId(responseUser.id);
        setUser(responseUser);
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

    const getUser = async () => {
        // TODO: correct when backend is ready
        try {
            const response = await api.get(`/users/${userId}`);
            setUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const requestResults = async () => {
        if (city === "" && minPrice === 0 && maxPrice === 0 && gender === "" && listingType === "" && zipCode === "" && minSqm === 0 && maxSqm === 0 && search === "") {
            try {
                setIsLoading(true)
                const response = await api.get('/listings');
                setListings(response.data.filter(listing => listing.published === true));
                setIsLoading(false);
            } catch (error) {
                alert(`Something went wrong during the registration: \n${handleError(error)}`);
                
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
                    "LISTING_TYPE": listingType,
                    "SEARCH": search
                });
                
                const response = await api.get(`/listings${queryString}`);
                
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
        } else if (name === "search") {
            setSearch(value);
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
        setSearch("");
    }, [])

    useEffect(() => {
        requestResults()
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
                user: user,
                login: login,
                logout: logout
            }
        }>
            <GatherContext.Provider value={
                {
                    searchStarted,
                    setSearchStarted,
                    showRequest,
                    setShowRequest,
                    showDetails,
                    setShowDetails,
                    sendRequest,
                    setSendRequest,
                    showDeniedToast
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
                            zipCode: zipCode,
                            search: search
                        }
                    }>

                        <Navbar requestFilteredResults={requestResults} user={user} getUser={getUser} brandName="Cozy Cave"/>
                        <ToastContainer/>
                        <Routes>
                            <Route exact path="/" element={<LandingPage/>}/>
                            <Route exact path="/overview" element={isLoading ? (
                                <div className="center-middle">
                                    <Spinner animation="border" variant="primary"/>
                                </div>
                            ) : (
                                <ResultsPage requestResults={requestResults} listings={listings}/>
                            )}/>
                            <Route path="/profile-page/:id/:location" element={<ProfilePage/>}/>
                            <Route path="/listings/:id" element={<AdOverviewPage/>}/>
                            <Route path="/create-listing"
                                   element={<CreateAd requestResults={requestResults}/>}/>
                            <Route path="/edit-listing/:id" element={user && <EditListing getUser={getUser}/>}/>
                            <Route path="/view-profile/:id"
                                   element={<ForeignViewProfile openAsOwnPage={true}/>}/>
                            <Route exact path="/gather-together" element={<GatherTogetherPage/>}/>
                            <Route exact path="/read-me" element={<ReadMe/>}/>
                        </Routes>
                    </FilterContext.Provider>
                </Router>
            </GatherContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;
