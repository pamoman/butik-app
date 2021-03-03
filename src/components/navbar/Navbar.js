/*
 * Navbar
 */

import React from 'react';
import PublicNav from './PublicNav';
import PrivateNav from './PrivateNav';
import { AuthCheck } from "components/auth/auth";
import useStyles from './Styles';

const Navbar = () => {
    const classes = useStyles(),
          isAuth = AuthCheck();

    const checkActiveRoot = (_, location) => {
        if (!location) {
            return false;
        }
        const {pathname} = location;

        let start = ["/"];

        return start.includes(pathname);
    };
        
    return (
        <nav className={classes.nav}>
            <PrivateNav to="/" activeClassName="selected-nav" isActive={ checkActiveRoot } name="Start" />
            <PrivateNav to="/logout" className="auth" activeClassName="selected-nav" name="Logga ut" />
            {!isAuth && <PublicNav to="/login" className="auth" activeClassName="selected-nav" name="Logga in" />}
            {!isAuth && <PublicNav to="/register" activeClassName="selected-nav" name="Registrera" />}
        </nav>
    );
};

export default Navbar;