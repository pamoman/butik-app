/*
 * Scan Manual
 */

import React, { useState } from 'react';
import { useItems } from "config/auth";
import { useLoadProduct } from 'models/load/Load';
import AlertButton from 'components/alert/AlertButton';
import getIcon from 'models/icon/Icon';
import { TextField, Typography, Button, Card, CardHeader, Tooltip, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const ScanManual = () => {
    const classes = useStyles(),
          [items, setItems] = useItems(),
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
                    autoFocus={true}
                />
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
                <AlertButton
                    buttonTitle="Börja om"
                    alertTitle="Rensa korgen?"
                    description="Är du säkert att du vill ta bort alla produkter från din korg och börja om?"
                    icon={getIcon("Refresh")}
                    onAccept={() => setItems([])}
                    disabled={!items.length}
                />
            </CardActions>
        </Card>
    )
}

export default ScanManual;