/*
 * Graphql - Buy
 */

import { gql, useMutation } from '@apollo/client';

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
                department
                total
                items {
                    name
                    quantity
                    price
                }
            }
        }
    }
`;

export const useCreateSale = () => {
    const [createSaleMutation] = useMutation(CHECKOUT);

    const createSale = (input) => {
        return createSaleMutation({ variables: { input } });
    }

    return createSale;
};