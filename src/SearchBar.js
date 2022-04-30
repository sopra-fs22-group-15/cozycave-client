import React from 'react';
import "./styles/SearchBar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Button from "./components/util/Button";
import { useNavigate } from 'react-router-dom';


const SearchBar = props => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/overview');
    }


    return (
        <div className="input-group">
            <input type="text" className={`form-control input-group ${props.style ? "nav-search" : ""}`}
                   placeholder="Find your new home... "
                   aria-label="Find your new home... " aria-describedby="button-addon2"/>
            <Button variant="primary" type="button" id="button-addon2" onClick={handleClick}>
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
        </div>
    )
}

export default SearchBar;