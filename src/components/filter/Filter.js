/*
 * Filter
 */

import { createContext, useContext } from 'react';

export const FilterContext = createContext();

export const FilterProvider = FilterContext.Provider;

export const useFilter = () => {
    return useContext(FilterContext);
}

export const filterData = (data) => {
    let isIncluded = true,
        filterList = [];

    filterList.forEach(filter => {
        if (isIncluded) {
            switch (filter) {
                case "1":
                    isIncluded = true;
                    break;
                default:
                    break;
            }
        }
    });

    return isIncluded;
};