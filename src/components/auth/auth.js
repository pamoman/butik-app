/*
 * Auth
 */

import { useAuthToken, useUserRole } from "config/auth";

export const AuthCheck = () => {
    const [authToken] = useAuthToken();

    return authToken ? true : false;
}

export const AdminCheck = () => {
    const [userRole] = useUserRole();

    return userRole === "Admin";
}