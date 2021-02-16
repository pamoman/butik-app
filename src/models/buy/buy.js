/*
 * Graphql - Buy
 */

import { gql, useLazyQuery } from '@apollo/client';

export const BUY = gql`
    query getProduct ($barcode: String!) {
        products(where: { barcodes: { value: $barcode } }) {
            name
            barcodes {
                value
            }
        } 
    }
`;