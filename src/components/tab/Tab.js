/*
 * Tabs
 */

import { createContext, useContext } from 'react';

export const TabContext = createContext();

export const TabProvider = TabContext.Provider;

export const useTab = () => {
    return useContext(TabContext);
}