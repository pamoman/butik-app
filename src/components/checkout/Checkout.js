/*
 * Summary
 */

import React from 'react';
import getIcon from 'models/icon/Icon';
import utils from 'models/utils/utils';
import { useItems } from "config/auth";
import { useUser } from "config/auth";
import { useCreateSale } from 'models/buy/buy.js';
import { Typography, Button, Card, CardHeader, Tooltip, CardContent, CardActions } from '@material-ui/core';
import useStyles from './Styles';

const Checkout = () => {
    const classes = useStyles(),
          [items] = useItems(),
          [user] = useUser(),
          createSale = useCreateSale(),
          currency = utils.currency,
          quantity = utils.quantity;
    
    const calculateTotal = () => {
        return items.reduce((total, row) => total + (row.item.product.price * row.qty), 0);
    };

    const checkoutNow = () => {
        console.log(user.info.department.name);
        /* createSale({
            data: {
                department: user.info.department.name,
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
        }) */
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
                <Typography variant="h5">
                    {`Antal produkter: ${quantity(items.length)}`}
                </Typography>

                <Typography variant="h5">
                    {`Summa: ${currency(calculateTotal())}`}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardActions} disableSpacing>
                <Tooltip
                    title=
                    {
                        <Typography variant="body1">
                            Bekräfta ditt köp
                        </Typography>
                    }
                >
                    <div>
                        <Button
                            className={classes.invoiceButton}
                            color="primary"
                            variant="contained"
                            startIcon={getIcon("Save")}
                            onClick={checkoutNow}
                            disabled={!items.length}
                        >
                            Köp
                        </Button>
                    </div>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Checkout;