/*
 * AdminNav
 */

import React from "react";
import { NavLink } from "react-router-dom";
import { AuthCheck, AdminCheck } from "components/auth/auth.js";

const AdminNav = ({ name, ...props }) => {
    const isAuth = AuthCheck();
    const isAdmin = AdminCheck();

    return isAuth && isAdmin && (<NavLink {...props}>{name}</NavLink>);
}

export default AdminNav;
