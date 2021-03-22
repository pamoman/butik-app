/*
 * Buy
 */

import React, { useEffect } from 'react';
import ScanAuto from 'components/scan/ScanAuto';
import ScanManual from 'components/scan/ScanManual';
import Basket from 'components/basket/Basket';
import Checkout from 'components/checkout/Checkout';
import { useUser } from "config/auth";
import { useMessage } from 'components/messageSystem/Message';
import { useTab } from "components/tab/Tab";
import { Grid, Typography } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import useStyles from './Styles';

const Buy = () => {
    const title = "Handla",
          tabContext = useTab(),
          tab = tabContext.tab,
          [user] = useUser(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          classes = useStyles();
    
    useEffect(() => {
        setMessage({ open: true, text: `Hej ${user.info.firstname}! Ta skannern till höger och börja handla!`, severity: "success" });
    }, []);

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={12} sm={6}>
                    <TabContext value={tab}>
                        <TabPanel value={0}>
                            <ScanAuto />
                        </TabPanel>

                        <TabPanel value={1}>
                            <ScanManual />
                        </TabPanel>
                    </TabContext>
                </Grid>

                <Grid item xs={12} sm={6}><Checkout /></Grid>

                <Grid item xs={12}><Basket /></Grid>
            </Grid>
        </Grid>
    );
};

export default Buy;