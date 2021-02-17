/*
 * Start
 */

import React, { useState } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useQuery, useLazyQuery } from '@apollo/client';
import { BUY, DEPARTMENTS } from 'models/buy/buy.js';
import { useUser, useBasket } from "config/auth";
import Basket from 'components/basket/Basket';
import Summary from 'components/summary/Summary';
import { Grid, Tooltip, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Start = () => {
    const title = "Köp",
          [barcode, setBarcode] = useState(""),
          [user] = useUser(),
          [basket, setBasket] = useBasket(),
          [department, setDepartment] = useState("Vaktmästeriet"),
          classes = useStyles();

    const [loadProduct, { loading: productLoading }] = useLazyQuery(BUY, {
        fetchPolicy: "network-only",
        onError: error => console.log(`Error! ${error.message}`),
        onCompleted: data => {
            if (data.barcodes && data.barcodes.length > 0) {
                let newItem = data.barcodes[0];
                let qty = newItem.qty;
                let found = basket.find(row => row.item.product.id === newItem.product.id);

                if (found) {
                    found.qty += found.item.qty;
                } else {
                    basket.push({
                        item: newItem, qty
                    });
                }

                setBasket(basket);
                setBarcode("");
            }
        }
    });
    
    const Add = (e) => {
        e.preventDefault();

        loadProduct({ variables: { barcode }});
    }

    /*---- Data query start ----*/
    const { loading: departmentLoading, error, data } = useQuery(DEPARTMENTS, { variables: { id: user.id } });

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

                            {data && data.departments.map((dpmt, i) => (
                                <option key={`department-${i}`} value={dpmt.name}>
                                    {dpmt.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <form className={classes.invoiceForm} onSubmit={Add}>
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
                                >
                                    Lägg till
                                </Button>

                                <Button
                                    className={classes.invoiceButton}
                                    color="primary"
                                    variant="contained"
                                    startIcon={getIcon("Delete")}
                                    onClick={() => setBasket([])}
                                >
                                    Rensa
                                </Button>
                            </ButtonGroup>
                        </form>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Summary />
                </Grid>

                <Grid item xs={12}><Basket /></Grid>
            </Grid>
        </Grid>
    );
};

export default Start;