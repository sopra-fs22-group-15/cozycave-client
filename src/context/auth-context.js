import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: true,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});