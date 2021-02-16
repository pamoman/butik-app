/*
 * Start
 */

import React, { useState, useEffect } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useLazyQuery } from '@apollo/client';
import { BUY } from 'models/buy/buy.js';
import { Grid, Tooltip, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
import getIcon from 'models/icon/Icon';
import useStyles from './Styles';

const Start = () => {
    const title = "Köp",
          [barcode, setBarcode] = useState(""),
          [items, setItems] = useState([]),
          classes = useStyles();
    
    const [loadProduct, { loading, error }] = useLazyQuery(BUY, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            if (data.products && data.products.length > 0) {
                let newItem = Object.create(data.products[0]);

                if (items.some(item => item.name === newItem.name)) {
                    console.log("yes");
                }

                setItems([...items, newItem]);
                setBarcode("");
            }
        }
    });
    
    const Add = (e) => {
        e.preventDefault();

        loadProduct({ variables: { barcode }});
        
    }

    error && console.log(`Error! ${error.message}`);

    useLoadingEffect(loading);

    return (
        <Grid container className="page-container">
            <Grid item xs={12} className={`banner ${classes.pageBanner}`}>
                <Typography variant="h1">{title}</Typography>
            </Grid>

            <Grid container spacing={4} className="page">
                <Grid item xs={12}>
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
                            </ButtonGroup>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Start;