/*
 * Graphql - Buy
 */

import { gql } from '@apollo/client';

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