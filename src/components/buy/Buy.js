/*
 * Buy
 */

import React, { useEffect } from 'react';
import Scan from 'components/scan/Scan';
import Basket from 'components/basket/Basket';
import Checkout from 'components/checkout/Checkout';
import { useUser } from "config/auth";
import { useMessage } from 'components/messageSystem/Message';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './Styles';

const Buy = () => {
    const title = "Handla",
          [user] = useUser(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          classes = useStyles();
    
    useEffect(() => {
        setMessage({ open: true, text: `Hej ${user.info.firstname}! Ta skannern till höger och börja handla!`, severity: "success" });
    }, [])

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={12} sm={6}><Scan /></Grid>

                <Grid item xs={12} sm={6}><Checkout /></Grid>

                <Grid item xs={12}><Basket /></Grid>
            </Grid>
        </Grid>
    );
};

export default Buy;