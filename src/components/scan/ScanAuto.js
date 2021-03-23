/*
 * Scan Auto
 */

import React from 'react';
import { useItems } from "config/auth";
import { useLoadProduct } from 'models/load/Load';
import BarcodeReader from 'react-barcode-reader';
import AlertButton from 'components/alert/AlertButton';
import getIcon from 'models/icon/Icon';
import { Typography, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const ScanAuto = () => {
    const [items, setItems] = useItems(),
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
};

export default ScanAuto;