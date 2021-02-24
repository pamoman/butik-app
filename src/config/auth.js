/*
 * Auth - config
 */

import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useCookies } from 'react-cookie';

const TOKEN_NAME = "authToken";
const USER_ROLE = "userRole";
const USER = "user";
const ITEMS = "items";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    const setAuthToken = (authToken) => setCookie(TOKEN_NAME, authToken, { maxAge: 3600, sameSite: "lax", path: '/' });

    const removeAuthToken = () => removeCookie(TOKEN_NAME, { sameSite: "lax" });

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export const useUserRole = () => {
    const [cookies, setCookie, removeCookie] = useCookies([USER_ROLE]);

    const setUserRole = (isAdmin) => setCookie(USER_ROLE, isAdmin, { maxAge: 3600, sameSite: "lax", path: '/' });

    const removeUserRole = () => removeCookie(USER_ROLE, { sameSite: "lax" });

    return [cookies[USER_ROLE], setUserRole, removeUserRole];
};

export const useUser = () => {
    const [cookies, setCookie, removeCookie] = useCookies([USER_ROLE]);

    const setUser = (user) => setCookie(USER, user, { maxAge: 3600, sameSite: "lax", path: '/' });

    const removeUser = () => removeCookie(USER, { sameSite: "lax" });

    return [cookies[USER], setUser, removeUser];
};

export const useItems = () => {
    const [cookies, setCookie, removeCookie] = useCookies([ITEMS]);

    const setItems = (items) => setCookie(ITEMS, items, { maxAge: 3600, sameSite: "lax", path: '/' });

    const removeItems = () => removeCookie(ITEMS, { sameSite: "lax" });

    return [cookies[ITEMS], setItems, removeItems];
};

export const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const [, , removeUserRole] = useUserRole();
    const [, , removeUser] = useUser();
    const [, , removeItems] = useItems();
    const apolloClient = useApolloClient();
    const history = useHistory();

    const logout = async () => {
        await apolloClient.clearStore();

        removeAuthToken();
        removeUserRole();
        removeUser();
        removeItems();

        history.push("/login");
        window.location.reload();
    };

    return logout;
};