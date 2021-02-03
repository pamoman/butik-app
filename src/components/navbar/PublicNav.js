/*
 * PublicNav
 */

import React from "react";
import { NavLink } from "react-router-dom";

const PublicNav = ({ name, ...props }) => {

    return (<NavLink {...props}>{name}</NavLink>);
}

export default PublicNav;
