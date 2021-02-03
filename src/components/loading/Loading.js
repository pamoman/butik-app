/*
 * Loading
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import useStyles from './Styles';

const LoadingContext = createContext({
    loading: false,
    setLoading: () => { }
});

export function useLoading() {
    const { loading, setLoading } = useContext(LoadingContext);

    return [loading, setLoading];
}

export function useLoadingEffect(loading) {
    const [, setLoading] = useLoading();

    useEffect(() => {
        setLoading(loading);
    });
}

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function Loading() {
    const { loading } = useContext(LoadingContext),
        classes = useStyles();

    return (
        loading && (
            <div>
                <div className={classes.loadingLayer} />
                <div className={classes.loadingContainer}>
                    <div className={classes.loading} />
                </div>
            </div>
        )
    );
}