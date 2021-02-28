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
          [department, setDepartment] = useState(user.info?.department?.name || ""),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          client = useApolloClient(),
          classes = useStyles();

    const loadProduct = () => {
        /* Using client directly because useLazyQuery not working correctly - Bug */
        client.query({
            query: BUY,
            variables: { barcode },
            fetchPolicy: "network-only",
        })
        .then(res => {
            const data = res.data;

            if (data.barcodes && data.barcodes.length > 0) {
                let newItem = data.barcodes[0];
                
                items.push({
                    item: newItem, qty: newItem.qty
                });
    
                setItems(items);
                setMessage({ open: true, text: `Produkt inlagt: ${newItem.product.name}`, severity: "success" });
            } else {
                setMessage({ open: true, text: `Produkt finns inte!`, severity: "error" });
            }
        })
        .catch(error => console.log(`Error! ${error.message}`));
    };

    const loadProductHandler = (e) => {
        if (e.key === "Enter") {
            const found = items.find(row => row.item.value === barcode);
           
            if (found) {
                found.qty += found.item.qty;

                setMessage({ open: true, text: `${found.item.product.name} har ökat med ${found.item.qty}`, severity: "success" });
            } else {
                loadProduct();
            }

            setBarcode("");
        }
    }

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
                                onChange={e => setBarcode(e.target.value)}
                                onKeyPress={loadProductHandler}
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
                                    onClick={() => { setBarcode(""); setItems([])}}
                                >
                                    Rensa
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Checkout items={items} user={user} />
                </Grid>

                <Grid item xs={12}><Basket items={items} setItems={setItems} /></Grid>
            </Grid>
        </Grid>
    );
};

export default Start;