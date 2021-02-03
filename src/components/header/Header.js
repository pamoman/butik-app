/*
 * Header
 */

import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { AuthCheck } from "components/auth/auth";
import Navbar from 'components/navbar/Navbar';
import Controlbar from 'components/controlbar/Controlbar';
import logo from 'assets/logo/logo.png';
import useStyles from './Styles';

const Header = () => {
    const title = "App",
          isAuth = AuthCheck(),
          classes = useStyles();

    return (
        <header className={classes.header}>
            <Box className={classes.headerNav}>
                <NavLink className={classes.siteHeading} to="/">
                    <img src={logo} className={classes.siteLogo} alt="logo" />
                    <Typography color="primary" variant="h4">{title}</Typography>
                </NavLink >

                <Navbar />
            </Box>
            
            {isAuth && <Controlbar />}
        </header>
    )
}

export default Header;
