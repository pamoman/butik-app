/*
 * PrivateRoute
 */

import React from "react";
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import { Route, Redirect } from "react-router-dom";
import { AuthCheck } from "./auth.js";

function PrivateRoute({ exact, path, Component, ...rest }) {
    const isAuth = AuthCheck();

    if (isAuth === null) {
        return null;
    };

    return (
        <Route exact path={ path } render={ (props) => (
            isAuth
                ?
                <ErrorBoundary key={ path }>
                    <Component { ...props } { ...rest } />
                </ErrorBoundary>
                :
                <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                    }}
                />
            )}
        />
    );
}

export default PrivateRoute;
