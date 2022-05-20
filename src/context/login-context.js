import {createContext} from 'react';

export const LoginContext = createContext({
    loginOpen: false,
    resetOpen: true,
    setReset: () => {},
    displaySuccess: () => {}
});