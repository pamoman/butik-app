/*
 * AdminRoute
 */

import React from "react";
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import { Route, Redirect } from "react-router-dom";
import { AuthCheck, AdminCheck } from "components/auth/auth.js";

function AdminRoute({ path, Component, ...rest }) {
    const isAuth = AuthCheck();
    const isAdmin = AdminCheck();

    if (isAuth === null || isAdmin === null) {
        return null;
    };

    return (
        <Route exact path={ path } render={ (props) => (
            isAuth && isAdmin
                ?
                <ErrorBoundary key={ path }>
                    <Component { ...props } { ...rest } />
                </ErrorBoundary>
                :
                <Redirect to="/" />
            )}
        />
    );
}

export default AdminRoute;
