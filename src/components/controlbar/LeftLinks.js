/*
 * LeftLinks
 */

import React from 'react';
import { useAuthToken } from "config/auth";
import { Typography, Tooltip, IconButton, ButtonGroup } from '@material-ui/core';
import { uri } from "config/Client";
import getIcon from 'models/icon/Icon';

const Links = () => {
    const [authToken] = useAuthToken();

    const goTo = (where) => {
        return window.open(where, "_blank");
    }

    const call = (where) => {
        fetch(where, { headers: { 'authorization': `Bearer ${authToken}` } })
        .then(() => window.location.reload());
    };

    return (
        <ButtonGroup color="primary" aria-label="Filter Switches">
        </ButtonGroup>
    )
}

export default Links;