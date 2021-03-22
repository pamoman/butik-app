/*
 * Scan Manual
 */

import React, { useState } from 'react';
import { useItems } from "config/auth";
import { useLoadProduct } from 'models/load/Load';
import getIcon from 'models/icon/Icon';
import { TextField, Typography, Button, Card, CardHeader, Tooltip, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const ScanManual = () => {
    const classes = useStyles(),
          [_, setItems] = useItems(),
          [barcodeInput, setBarcodeInput] = useState(""),
          [loadProduct] = useLoadProduct();

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={
                    <Typography variant="h5">
                        {getIcon("Manual")}
                    </Typography>
                }
            />

            <CardContent className={classes.CardContent}>
                <TextField
                    className={classes.barcode}
                    id="barcode"
                    name="barcode"
                    label="Streckkod"
                    type="text"
                    variant="filled"
                    value={barcodeInput}
                    InputProps={{ disableUnderline: true }}
                    onChange={e => setBarcodeInput(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && loadProduct({ value: barcodeInput, onSuccess: () => setBarcodeInput("")})}
                />
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
                <Tooltip
                    title=
                    {
                        <Typography variant="body1">
                            Ta bort alla produkter från din korg och börja om
                        </Typography>
                    }
                >
                    <Button
                        className={classes.invoiceButton}
                        color="primary"
                        variant="contained"
                        startIcon={getIcon("Refresh")}
                        onClick={() => setItems([])}
                    >
                        Börja om
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default ScanManual;