import React from 'react';

const SearchBar = () => {
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Find your new home... "
                   aria-label="Find your new home... " aria-describedby="button-addon2"/>
                <button className="btn btn-primary" type="button" id="button-addon2">
                    Search
                </button>
        </div>
    )
}

export default SearchBar;