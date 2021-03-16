/*
 * Scan
 */

import React, { useState } from 'react';
import { BUY } from 'models/buy/buy.js';
import { useApolloClient } from '@apollo/client';
import { useMessage } from 'components/messageSystem/Message';
import { useItems } from "config/auth";
import getIcon from 'models/icon/Icon';
import { TextField, Typography, Button, Card, CardHeader, Tooltip, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const Scan = () => {
    const classes = useStyles(),
          [barcode, setBarcode] = useState(""),
          [items, setItems] = useItems(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          client = useApolloClient();

    const loadProductHandler = (e) => {
        if (e.key === "Enter") {
            const found = items.find(row => row.item.value === barcode);
           
            if (found) {
                found.qty += found.item.qty;

                setItems(items);

                setMessage({ open: true, text: `${found.item.product.name} har ökat med ${found.item.qty}`, severity: "success" });
            } else {
                loadProduct();
            }

            setBarcode("");
        }
    };

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
                <TextField
                    className={classes.invoiceInput}
                    id="barcode"
                    name="barcode"
                    label="Streckkod"
                    type="text"
                    variant="filled"
                    value={barcode}
                    InputProps={{ disableUnderline: true }}
                    onChange={e => setBarcode(e.target.value)}
                    onKeyPress={loadProductHandler}
                    autoFocus={true}
                />
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
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
            </CardActions>
        </Card>
    )
}

export default Scan;