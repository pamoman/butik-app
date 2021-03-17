/*
 * Navbar
 */

import React from 'react';
import PublicNav from './PublicNav';
import PrivateNav from './PrivateNav';
import { AuthCheck } from "components/auth/auth";
import { Box, Avatar, Tooltip, Typography, LinkIcon } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
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

    const NavIcon = (icon, name) => {
        return (
            <Box className={classes.navIcon}>
                <Typography>
                    { getIcon(icon) }
                </Typography>

                <Typography variant="button">
                    {name}
                </Typography>
            </Box>
        )
    }
        
    return (
        <nav className={classes.nav}>
            <PrivateNav to="/" activeClassName="selected-nav" isActive={ checkActiveRoot } name={NavIcon("Basket", "Handla")} />
            <PrivateNav to="/me" className="auth" activeClassName="selected-nav" name={NavIcon("Me", "Mitt Konto")} />
            <PrivateNav to="/logout" activeClassName="selected-nav" name={NavIcon("Logout", "Logga Ut")} />
            {!isAuth && <PublicNav to="/register" className="auth" activeClassName="selected-nav" name={NavIcon("Register", "Registrera")} />}
            {!isAuth && <PublicNav to="/login" activeClassName="selected-nav" name={NavIcon("Login", "Logga In")} />}
        </nav>
    );
};

export default Navbar;