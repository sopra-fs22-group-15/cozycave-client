import {createContext} from 'react';

export const GatherContext = createContext({
    searchStarted: false,
    reRenderPage: false,
    setSearchStarted: () => {},
    setReRenderPage: () => {}
});