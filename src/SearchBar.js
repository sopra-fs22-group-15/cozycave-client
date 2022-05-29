import React, {useContext} from 'react';
import "./styles/SearchBar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Button from "./components/util/Button";
import {FilterContext} from "./context/filter-context";
import {useNavigate} from "react-router-dom";


const SearchBar = props => {

    const navigate = useNavigate();

    const filter = useContext(FilterContext);

    const handleClick = e => {
        e.preventDefault();
        props.requestFilteredResults();
        navigate('/overview');
    }

    const handleChange = e => {
        const {name, value} = e.target;
        filter.setFilter(name, value);
    }

    //console.log(searchFilter);


    return (
        <div className="input-group">
            <input name="search" type="text" className={`form-control input-group ${props.style ? "nav-search" : ""}`}
                   placeholder="Find your new home... "
                   onChange={e => handleChange(e)}
                   aria-label="Find your new home... " aria-describedby="button-addon2"/>
            <Button name="search" variant="primary" type="button" id="button-addon2" onClick={handleClick}>
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
        </div>
    )
}

export default SearchBar;