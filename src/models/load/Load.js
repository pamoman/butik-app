/*
 * Load
 */

import { BUY } from 'models/buy/buy.js';
import { useApolloClient } from '@apollo/client';
import { useMessage } from 'components/messageSystem/Message';
import { useItems } from "config/auth";

export const useLoadProduct = () => {
    const [items, setItems] = useItems(),
          messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          client = useApolloClient();
    
    const loadProduct = ({ value, onSuccess, onError }) => {
        const found = items.find(row => row.item.value === value);
        
        if (found) {
            found.qty += found.item.qty;

            setItems(items);

            setMessage({ open: true, text: `${found.item.product.name} har ökat med ${found.item.qty}`, severity: "success" });

            onSuccess && onSuccess();
        } else {
            getProduct(value, onSuccess, onError);
        }
    };
    
    const getProduct = (value, onSuccess, onError) => {
        /* Using client directly because useLazyQuery not working correctly - Bug */
        client.query({
            query: BUY,
            variables: { barcode: value },
            fetchPolicy: "network-only",
        })
        .then(res => {
            const data = res.data;

            if (data.barcodes && data.barcodes.length > 0) {
                let newItem = data.barcodes[0];
                
                items.unshift({
                    item: newItem, qty: newItem.qty
                });
    
                setItems(items);
                setMessage({ open: true, text: `Produkt inlagt: ${newItem.product.name}`, severity: "success" });

                onSuccess && onSuccess();
            } else {
                setMessage({ open: true, text: `Produkt finns inte!`, severity: "error" });

                onError && onError();
            }
        })
        .catch(error => setMessage({ open: true, text: error.message, severity: "error" }));
    };

    return [loadProduct];
};