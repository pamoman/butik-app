/*
 * Selector
 */

import React, { useState } from 'react';
import { TextField, IconButton, ButtonGroup } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Selector = () => {
    const classes = useStyles();

    return (
        <ButtonGroup color="primary" aria-label="Select">
        </ButtonGroup>
    )
}

export default Selector;