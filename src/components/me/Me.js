/*
 * Me
 */

import React, { useState } from 'react';
import { Grid, Tooltip, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
import useStyles from './Styles';

const Me = () => {
    const title = "Mitt konto",
          classes = useStyles();
    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">

            </Grid>
        </Grid>
    )
};

export default Me;