import {createContext} from 'react';


export const FilterContext = createContext({
    city: "",
    gender: "BOTH",
    minPrice: 0,
    maxPrice: 0,
    minSqm: 0,
    maxSqm: 0,
    listingType: "",
    zipCode: "",
    setFilters: () => {},
    clearFilters: () => {}
})