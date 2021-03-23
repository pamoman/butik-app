/*
 * Summary
 */

import React from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import { useItems } from "config/auth";
import { useUser } from "config/auth";
import { useDepartment } from "config/auth";
import { useCreateSale } from 'models/buy/buy.js';
import AlertButton from 'components/alert/AlertButton';
import { Typography, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const Checkout = () => {
    const classes = useStyles(),
          [items] = useItems(),
          [user] = useUser(),
          [department] = useDepartment(),
          createSale = useCreateSale(),
          currency = utils.currency;
    
    const calculateTotal = () => {
        return items.reduce((total, row) => total + (row.item.product.price * row.qty), 0);
    };

    const checkoutNow = () => {
        createSale({
            data: {
                department,
                firstname: user.info.firstname,
                lastname: user.info.lastname,
                total: calculateTotal(),
                items: items.map(row => {
                    return {
                        name: row.item.product.name,
                        quantity: row.qty,
                        price: row.item.product.price,
                        subtotal: row.item.product.price * row.qty
                    }
                })
            }
        })
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={
                    <Typography variant="h5">
                        {getIcon("Pay")}
                    </Typography>
                }
            />

            <CardContent className={classes.CardContent}>
                <Typography variant="h4" align="center">
                    {`Summa: ${currency(calculateTotal())}`}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
                <AlertButton
                    buttonTitle="Köp"
                    alertTitle="Bekräfta ditt köp"
                    description="Du kommer nu att avsluta din köp, är du verkligen klar?"
                    icon={getIcon("Save")}
                    disabled={!items.length}
                    onAccept={checkoutNow}
                />
            </CardActions>
        </Card>
    )
};

export default Checkout;