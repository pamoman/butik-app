/*
 * Scan Auto
 */

import React from 'react';
import { useItems } from "config/auth";
import { useLoadProduct } from 'models/load/Load';
import BarcodeReader from 'react-barcode-reader';
import getIcon from 'models/icon/Icon';
import { Typography, Button, Card, CardHeader, Tooltip, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const ScanAuto = () => {
    const [_, setItems] = useItems(),
          classes = useStyles(),
          [loadProduct] = useLoadProduct();

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={
                    <Typography variant="h5">
                        { getIcon("Scan") }
                    </Typography>
                }
            />

            <CardContent className={classes.CardContent}>
                <Typography variant="h5" align="center">
                    Skanna dina produkter
                </Typography>

                <BarcodeReader
                    onError={err => console.log(err)}
                    onScan={value => loadProduct({ value }) }
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
};

export default ScanAuto;