/*
 * Items
 */

import { useCookies } from 'react-cookie';

const ITEMS = "items";

export const useItems = () => {
    const [cookies, setCookie, removeCookie] = useCookies([ITEMS]);

    const setItems = (items) => setCookie(ITEMS, items, { maxAge: 3600, sameSite: "lax", path: '/' });

    const removeItems = () => removeCookie(ITEMS, { sameSite: "lax" });

    return [cookies[ITEMS], setItems, removeItems];
};