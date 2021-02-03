/*
 * PublicRoute
 */

import React from "react";
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import { Route } from "react-router-dom";

function PublicRoute({ exact, path, Component, ...rest }) {
    return (
        <Route exact path={ path } render={ (props) => (
            <ErrorBoundary key={ path } >
                <Component { ...props } { ...rest } />
            </ErrorBoundary>
        )} />
    );
}

export default PublicRoute;