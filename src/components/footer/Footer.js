/*
 * Footer
 */

import React from 'react';
import { Box, Typography, Hidden } from '@material-ui/core';
import Navbar from 'components/navbar/Navbar';
import useStyles from './Styles';

const Footer = () => {
    const text = `\u00A9 2021 Paul Moreland @ Pamosystems`;
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Hidden smDown>
                <Box className={classes.copyright}>
                    <Typography variant="h6">{text}</Typography>
                </Box>
            </Hidden>
            
            <Hidden mdUp>
                <Box className={classes.footerNav}>
                    <Navbar />
                </Box>
            </Hidden>
        </footer>
    );
};

export default Footer;
