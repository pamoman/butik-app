/*
 * Buy
 */

import React from 'react';
import Scan from 'components/scan/Scan';
import Basket from 'components/basket/Basket';
import Checkout from 'components/checkout/Checkout';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './Styles';

const Buy = () => {
    const title = "Handla",
          classes = useStyles();

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={6}><Scan /></Grid>

                <Grid item xs={6}><Checkout /></Grid>

                <Grid item xs={12}><Basket /></Grid>
            </Grid>
        </Grid>
    );
};

export default Buy;