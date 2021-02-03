/*
 * Controlbar
 */

import React from 'react';
import { Grid } from '@material-ui/core';
import Selector from './Selector';
import LeftLinks from './LeftLinks';
import RightSwitches from './RightSwitches';
import useStyles from './Styles';

const Controlbar = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.controlBar} alignItems="center">
            <Grid item xs={6} md={3} className={classes.leftPanel}>
                <Grid container justify="flex-start">
                    <Grid item>
                        <LeftLinks />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={6} className={classes.centerPanel}>
                <Grid container justify="center">
                    <Grid item>
                        <Selector />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6} md={3} className={classes.rightPanel}>
                <Grid container justify="flex-end">
                    <Grid item>
                        <RightSwitches />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Controlbar;