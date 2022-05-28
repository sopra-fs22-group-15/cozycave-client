import {createContext} from 'react';

export const GatherContext = createContext({
    searchStarted: false,
    setSearchStarted: () => {},
    showRequest: null,
    setShowRequest: () => {},
    showDetails: null,
    setShowDetails: () => {},
    sendRequest: [],
    setSendRequest: () => {}
});