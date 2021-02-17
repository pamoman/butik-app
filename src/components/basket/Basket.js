/*
 * Basket
 */

import React, { useState, Fragment } from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import clsx from 'clsx';
import {
    Box, Typography, TextField, ButtonGroup, Button, Card, CardHeader, Tooltip, CardContent, CardActions,
    Avatar, IconButton, Collapse, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import useStyles from './Styles';
import { useBasket } from "config/auth";

const Basket = () => {
    const [basket, setBasket] = useBasket(),
          currency = utils.currency,
          quantity = utils.quantity;

    const increase = (barcode) => {
        let itemToChange = basket.find(row => row.item.value === barcode);

        itemToChange.qty += itemToChange.item.qty;
        setBasket(basket);
    }

    const decrease = (barcode) => {
        let itemToChange = basket.find(row => row.item.value === barcode);

        itemToChange.qty -= itemToChange.item.qty;
        setBasket(basket);
    }

    const setQty = (barcode, qty) => {
        let itemToChange = basket.find(row => row.item.value === barcode);

        itemToChange.qty = qty;
        setBasket(basket);
    }

    return (
        <TableContainer className="table-container">
            <Table className="table" aria-label="Person invoice table">
                <TableHead>
                    <TableRow>
                        <TableCell width="40%">Produkt</TableCell>
                        <TableCell width="10%">Förpackning</TableCell>
                        <TableCell width="10%">Pris/st</TableCell>
                        <TableCell width="10%">Total</TableCell>
                        <TableCell width="30%">Antal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.map((row, i) => {
                        return (
                            <TableRow key={`item-${i}`}>
                                <TableCell>{row.item.product.name}</TableCell>
                                <TableCell>{quantity(row.item.qty)}</TableCell>
                                <TableCell>{currency(row.item.product.price)}</TableCell>
                                <TableCell>{currency(row.qty * row.item.product.price)}</TableCell>
                                <TableCell>
                                    <ButtonGroup>
                                        <IconButton
                                            color="primary"
                                            variant="contained"
                                            onClick={() => decrease(row.item.value)}
                                        >
                                            {getIcon("Minus")}
                                        </IconButton>

                                        <TextField
                                            id="amount"
                                            name="amount"
                                            label="Antal"
                                            type="number"
                                            value={row.qty}
                                            onChange={(e) => setQty(row.item.value, parseInt(e.target.value))}
                                            required
                                            variant="filled"
                                        />

                                        <IconButton
                                            color="primary"
                                            variant="contained"
                                            onClick={() => increase(row.item.value)}
                                        >
                                            {getIcon("Plus")}
                                        </IconButton>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Basket;