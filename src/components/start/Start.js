/*
 * Start
 */

import React, { useState } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useQuery, useLazyQuery } from '@apollo/client';
import { BUY, DEPARTMENTS } from 'models/buy/buy.js';
import { useUser, useItems } from "config/auth";
import Basket from 'components/basket/Basket';
import Checkout from 'components/checkout/Checkout';
import { Grid, Tooltip, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Start = () => {
    const title = "Köp",
          [barcode, setBarcode] = useState(""),
          [user] = useUser(),
          [items, setItems] = useItems(),
          [department, setDepartment] = useState(user.user?.department?.name || ""),
          classes = useStyles();

    const [loadProduct, { loading: productLoading }] = useLazyQuery(BUY, {
        fetchPolicy: "network-only",
        onError: error => console.log(`Error! ${error.message}`),
        onCompleted: data => {
            if (data.barcodes && data.barcodes.length > 0) {
                let newItem = data.barcodes[0],
                    qty = newItem.qty,
                    found = items.find(row => row.item.product.id === newItem.product.id);

                if (found) {
                    found.qty += found.item.qty;
                } else {
                    items.push({
                        item: newItem, qty
                    });
                }

                setItems(items);
                setBarcode("");
            }
        }
    });

    /*---- Data query start ----*/
    const { loading: departmentLoading, error, data } = useQuery(DEPARTMENTS);

    useLoadingEffect(productLoading || departmentLoading);

    error && console.log(`Error! ${error.message}`);
    /*---- Data query end ----*/

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.invoiceInput}
                            id="invoice-bill"
                            select
                            label="Räkning"
                            SelectProps={{
                                native: true,
                            }}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            variant="filled"
                        >
                            <option key={`bill-01`} value={"start"} disabled>Välj här</option>

                            {data && data.departments.map((d, i) => (
                                <option key={`department-${i}`} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <form className={classes.invoiceForm}>
                            <ButtonGroup className={classes.invoiceFormGroup} aria-label="Lägg till en vara">
                                <TextField
                                    className={classes.invoiceInput}
                                    id="barcode"
                                    name="barcode"
                                    label="Streckkod"
                                    type="text"
                                    value={barcode}
                                    onChange={e => setBarcode(e.target.value)}
                                    required
                                    variant="filled"
                                />

                                <Button
                                    className={classes.invoiceButton}
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                    startIcon={getIcon("Add")}
                                    onClick={() => loadProduct({ variables: { barcode }})}
                                >
                                    Lägg till
                                </Button>

                                <Button
                                    className={classes.invoiceButton}
                                    color="primary"
                                    variant="contained"
                                    startIcon={getIcon("Delete")}
                                    onClick={() => setItems([])}
                                >
                                    Rensa
                                </Button>
                            </ButtonGroup>
                        </form>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Checkout items={items} />
                </Grid>

                <Grid item xs={12}><Basket items={items} setItems={setItems} /></Grid>
            </Grid>
        </Grid>
    );
};

export default Start;