import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: true,
    userId: null,
    user: null,
    token: null,
    login: () => {},
    logout: () => {}
});