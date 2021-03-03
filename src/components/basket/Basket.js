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

const Basket = ({ items, setItems }) => {
    const currency = utils.currency,
          quantity = utils.quantity;

    const increase = (barcode) => {
        let itemToChange = items.find(row => row.item.value === barcode);

        itemToChange.qty += itemToChange.item.qty;
        setItems(items);
    };

    const decrease = (barcode) => {
        let itemToChange = items.find(row => row.item.value === barcode);

        if (itemToChange.qty - itemToChange.item.qty > 0) {
            itemToChange.qty -= itemToChange.item.qty;
            setItems(items);
        } else if (itemToChange.qty - itemToChange.item.qty === 0) {
            items = items.filter(row => row.item.value !== barcode);
            setItems(items);
        }
    };

    const setQty = (barcode, qty) => {
        if (Number.isInteger(qty) && qty > 0) {
            console.log("number");
            let itemToChange = items.find(row => row.item.value === barcode);

            itemToChange.qty = qty;
            setItems(items);
        } else if (Number.isInteger(qty) && qty === 0) {
            items = items.filter(row => row.item.value !== barcode);
            setItems(items);
        }
    };

    const remove = (barcode) => {
        let itemToChange = items.find(row => row.item.value === barcode);

        items = items.filter(row => row.item.value !== barcode);
        setItems(items);
    };

    return items && items.length > 0 && (
        <TableContainer className="table-container">
            <Table className="table" aria-label="Person invoice table">
                <TableHead>
                    <TableRow>
                        <TableCell width="10%"></TableCell>
                        <TableCell width="35%">Produkt</TableCell>
                        <TableCell width="10%">Förpackning</TableCell>
                        <TableCell width="10%">Pris/st</TableCell>
                        <TableCell width="10%">Total</TableCell>
                        <TableCell width="25%" align="center">Antal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row, i) => {
                        return (
                            <TableRow key={`item-${i}`}>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        variant="contained"
                                        onClick={() => remove(row.item.value)}
                                    >
                                        {getIcon("Delete")}
                                    </IconButton>
                                </TableCell>
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
                                            type="text"
                                            value={row.qty}
                                            required
                                            variant="filled"
                                            onChange={(e) => setQty(row.item.value, parseInt(e.target.value))}
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