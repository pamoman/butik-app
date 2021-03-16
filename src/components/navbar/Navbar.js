/*
 * Navbar
 */

import React from 'react';
import PublicNav from './PublicNav';
import PrivateNav from './PrivateNav';
import { AuthCheck } from "components/auth/auth";
import { Avatar, Tooltip, Typography } from '@material-ui/core';
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

    const MyAvatar = () => {
        return (
            <Tooltip
                title=
                {
                    <Typography variant="body1">
                        Mitt konto
                    </Typography>
                }
            >
                <Avatar className={classes.avatar} alt="Me">
                    { getIcon("me") }
                </Avatar>
            </Tooltip>
        )
    }
        
    return (
        <nav className={classes.nav}>
            <PrivateNav to="/" activeClassName="selected-nav" isActive={ checkActiveRoot } name="Köp" />
            <PrivateNav to="/me" className="auth" activeClassName="selected-nav" name={MyAvatar()} />
            <PrivateNav to="/logout" activeClassName="selected-nav" name="Logga ut" />
            {!isAuth && <PublicNav to="/register" className="auth" activeClassName="selected-nav" name="Registrera" />}
            {!isAuth && <PublicNav to="/login" activeClassName="selected-nav" name="Logga in" />}
        </nav>
    );
};

export default Navbar;