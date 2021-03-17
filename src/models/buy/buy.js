/*
 * Graphql - Buy
 */

import { gql, useMutation } from '@apollo/client';
import { useItems } from "config/auth";
import { useMessage } from 'components/messageSystem/Message';

export const BUY = gql`
    query getProduct ($barcode: String!) {
        barcodes(where: { value: $barcode }) {
            value
            qty
            product {
                id
                name
                price
                stock
            }
        }
    }
`;

export const DEPARTMENTS = gql`
    query getDepartments {
        departments {
            id
            name
        }
    }
`;

export const CHECKOUT = gql`
    mutation createSale($input: createSaleInput!) {
        createSale(input: $input) {
            sale {
                firstname
                lastname
                total
                items {
                    name
                    quantity
                    price
                }
                department {
                    id
                    name
                }
            }
        }
    }
`;

export const useCreateSale = () => {
    const [, setItems, removeItems] = useItems(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage;

    const [createSaleMutation] = useMutation(CHECKOUT, {
        onError: (err) => {
            console.log(err);
            setMessage({ open: true, text: `Ursäkta, något gick fel!`, severity: "error" });
        },
        onCompleted: () => {
            setItems([]);
            setMessage({ open: true, text: `Klart!  Handla igen eller logga ut.`, severity: "success" });
        }
    });

    const createSale = (input) => {
        return createSaleMutation({ variables: { input } });
    }

    return createSale;
};