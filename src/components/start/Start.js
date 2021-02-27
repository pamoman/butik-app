/*
 * Start
 */

import React, { useState } from 'react';
import { useLoadingEffect } from "components/loading/Loading";
import { useQuery, useApolloClient } from '@apollo/client';
import { BUY, DEPARTMENTS } from 'models/buy/buy.js';
import { useUser, useItems } from "config/auth";
import { useMessage } from 'components/messageSystem/Message';
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
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          client = useApolloClient(),
          classes = useStyles();

    const loadProduct = () => {
        const data = client.query({
            query: BUY,
            variables: { barcode },
            fetchPolicy: "network-only",
        })
        .then(res => {
            const data = res.data;

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
                setMessage({ open: true, text: `Produkt inlagt: ${newItem.product.name}`, severity: "success" });
            }
        })
    };

    /*---- Data query start ----*/
    const { loading, error, data } = useQuery(DEPARTMENTS);

    useLoadingEffect(loading);

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
                        <ButtonGroup className={classes.invoiceFormGroup} aria-label="Lägg till en vara">
                            <TextField
                                className={classes.invoiceInput}
                                id="barcode"
                                name="barcode"
                                label="Streckkod"
                                type="text"
                                value={barcode}
                                onKeyPress={e => e.key === "Enter" && loadProduct()}
                                onChange={e => setBarcode(e.target.value)}
                                variant="filled"
                                autoFocus={true}
                            />

                            <Tooltip
                                title=
                                {
                                    <Typography variant="body1">
                                        Ta bort alla produkter
                                    </Typography>
                                }
                            >
                                <Button
                                    className={classes.invoiceButton}
                                    color="primary"
                                    variant="contained"
                                    startIcon={getIcon("Delete")}
                                    onClick={() => setItems([])}
                                >
                                    Rensa
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
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