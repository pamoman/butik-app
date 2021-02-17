/*
 * Summary
 */

import React, { useState, Fragment } from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import clsx from 'clsx';
import {
    Grid, Box, Typography, TextField, ButtonGroup, Button, Card, CardHeader, Tooltip, CardContent, CardActions,
    Avatar, IconButton, Collapse, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import useStyles from './Styles';
import { useBasket } from "config/auth";

const Summary = () => {
    const classes = useStyles(),
          [basket] = useBasket(),
          currency = utils.currency,
          quantity = utils.quantity;
    
    const calculateTotal = () => {
        return basket.reduce((total, row) => total + (row.item.product.price * row.qty), 0);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={
                    <Typography variant="h5">
                        {getIcon("Cart")}
                    </Typography>
                }
            />

            <CardContent className={classes.CardContent}>
                <Typography variant="h5">
                    {`Antal produkter: ${quantity(basket.length)}`}
                </Typography>

                <Typography variant="h5">
                    {`Summa: ${currency(calculateTotal())}`}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
                <Tooltip
                    title=
                    {
                        <Typography variant="body1">
                            Bekräfta ditt köp
                        </Typography>
                    }
                >
                    <Button
                        className={classes.invoiceButton}
                        color="primary"
                        variant="contained"
                        startIcon={getIcon("Save")}
                    >
                        Köp
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Summary;