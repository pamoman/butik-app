/*
 * Summary
 */

import React, { useState, Fragment } from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import { useCreateSale } from 'models/buy/buy.js';
import clsx from 'clsx';
import {
    Grid, Box, Typography, TextField, ButtonGroup, Button, Card, CardHeader, Tooltip, CardContent, CardActions,
    Avatar, IconButton, Collapse, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import useStyles from './Styles';

const Checkout = ({ items }) => {
    const classes = useStyles(),
          createSale = useCreateSale(),
          currency = utils.currency,
          quantity = utils.quantity;
    
    const calculateTotal = () => {
        return items.reduce((total, row) => total + (row.item.product.price * row.qty), 0);
    };

    const checkoutNow = () => {
        createSale({
            data: {
                firstname: "Ted",
                lastname: "Merry",
                department: "VKTM",
                total: 20,
                items: [
                    {
                        "name": "Penna",
                        "quantity": 1,
                        "price": 20
                    }
                ]
            }
        })
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
                    {`Antal produkter: ${quantity(items.length)}`}
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
                    <div>
                        <Button
                            className={classes.invoiceButton}
                            color="primary"
                            variant="contained"
                            startIcon={getIcon("Save")}
                            onClick={checkoutNow}
                            disabled={!items.length}
                        >
                            Köp
                        </Button>
                    </div>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Checkout;