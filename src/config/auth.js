/*
 * Auth - config
 */

import { useApolloClient } from '@apollo/client';
import { useCookies } from 'react-cookie';

const TOKEN_NAME = "authToken";
const USER_ROLE = "userRole";
const USER = "user";
const DEPARTMENT = "department";
const ITEMS = "items";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    const setAuthToken = (authToken) => setCookie(TOKEN_NAME, authToken, { maxAge: 3600, path: '/' });

    const removeAuthToken = () => removeCookie(TOKEN_NAME, { path: '/' });

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export const useUserRole = () => {
    const [cookies, setCookie, removeCookie] = useCookies([USER_ROLE]);

    const setUserRole = (isAdmin) => setCookie(USER_ROLE, isAdmin, { maxAge: 3600, path: '/' });

    const removeUserRole = () => removeCookie(USER_ROLE, { path: '/' });

    return [cookies[USER_ROLE], setUserRole, removeUserRole];
};

export const useUser = () => {
    const [cookies, setCookie, removeCookie] = useCookies([USER_ROLE]);

    const setUser = (user) => setCookie(USER, user, { maxAge: 3600, path: '/' });

    const removeUser = () => removeCookie(USER, { path: '/' });

    return [cookies[USER], setUser, removeUser];
};

export const useDepartment = () => {
    const [cookies, setCookie, removeCookie] = useCookies([DEPARTMENT]);

    const setDepartment = (department) => setCookie(DEPARTMENT, department, { maxAge: 3600, path: '/' });

    const removeDepartment = () => removeCookie(DEPARTMENT, { path: '/' });

    return [cookies[DEPARTMENT], setDepartment, removeDepartment];
};

export const useItems = () => {
    const [cookies, setCookie, removeCookie] = useCookies([ITEMS]);

    const setItems = (items) => setCookie(ITEMS, items, { maxAge: 3600, path: '/' });

    const removeItems = () => removeCookie(ITEMS, { path: '/' });

    return [cookies[ITEMS], setItems, removeItems];
};

export const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const [, , removeUserRole] = useUserRole();
    const [, , removeUser] = useUser();
    const [, , removeDepartment] = useDepartment();
    const [, , removeItems] = useItems();
    const apolloClient = useApolloClient();

    const logout = async () => {
        await apolloClient.clearStore();

        removeAuthToken();
        removeUserRole();
        removeUser();
        removeDepartment();
        removeItems();

        window.location.href = "/login";
    };

    return logout;
};