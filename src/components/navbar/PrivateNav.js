/*
 * PrivateNav
 */

import React from "react";
import { NavLink } from "react-router-dom";
import { AuthCheck } from "components/auth/auth.js";

const PrivateNav = ({ name, ...props }) => {
    const isAuth = AuthCheck();

    return isAuth && (<NavLink {...props}>{name}</NavLink>);
}

export default PrivateNav;
