/*
 * Start
 */

import React, { useState, useEffect } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useLazyQuery } from '@apollo/client';
import { BUY } from 'models/buy/buy.js';
import { useItems } from "components/items/Items";
import Basket from 'components/basket/Basket';
import Summary from 'components/summary/Summary';
import { Grid, Tooltip, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Start = () => {
    const title = "Köp",
          [barcode, setBarcode] = useState(""),
          [items, setItems] = useItems(),
          classes = useStyles();

    const [loadProduct, { loading }] = useLazyQuery(BUY, {
        fetchPolicy: "network-only",
        onError: error => console.log(`Error! ${error.message}`),
        onCompleted: data => {
            if (data.barcodes && data.barcodes.length > 0) {
                let newItem = data.barcodes[0];
                let qty = newItem.qty;
                let found = items.find(row => row.item.product.id === newItem.product.id);

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
    
    const Add = (e) => {
        e.preventDefault();

        loadProduct({ variables: { barcode }});
    }

    useLoadingEffect(loading);

    !items && setItems([]);

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={6}>
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
                                onClick={() => setItems([])}
                            >
                                Rensa
                            </Button>
                        </ButtonGroup>
                    </form>
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