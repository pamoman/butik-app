/*
 * Auth - config
 */

import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useCookies } from 'react-cookie';

const TOKEN_NAME = "authToken";
const USER_ROLE = "userRole";

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

export const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const [, , removeUserRole] = useUserRole();
    const apolloClient = useApolloClient();
    const history = useHistory();

    const logout = async () => {
        await apolloClient.clearStore();

        removeAuthToken();
        removeUserRole();

        history.push("/login");
        window.location.reload();
    };

    return logout;
};