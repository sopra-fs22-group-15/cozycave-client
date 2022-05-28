import {createContext} from 'react';

export const GatherContext = createContext({
    searchStarted: false,
    setSearchStarted: () => {},
});