/*
 * Logout
 */

import React from 'react';
import { useLogout } from "config/auth";
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './Styles';

const Logout = () => {
    const title = "Logga ut?",
          logout = useLogout(),
          classes = useStyles();

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={12}>
                    <Button
                        className="center"
                        name="logout"
                        color="primary"
                        size="large"
                        variant="contained"
                        onClick={logout}
                    >
                        Logga ut
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Logout;