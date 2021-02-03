/*
 * App
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { ApolloProvider } from '@apollo/client';
import { useAppApolloClient } from 'config/Client';
import { LoadingProvider, Loading } from "components/loading/Loading";
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme/Default';
import { FilterProvider } from "components/filter/Filter";
import { MessageProvider } from "components/messageSystem/Message";
import MessageSystem from "components/messageSystem/MessageSystem";

// Page components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Start from 'components/start/Start';

// Auth components
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import Forgot from 'components/auth/Forgot';
import Reset from 'components/auth/Reset';
import PublicRoute from 'components/auth/PublicRoute';
import PrivateRoute from 'components/auth/PrivateRoute';

const App = () => {
    const apolloClient = useAppApolloClient();
    const [message, setMessage] = useState({ open: false, text: "", severity: "" });
    const [filters, setFilters] = useState({});

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CookiesProvider>
                <ApolloProvider client={apolloClient}>
                    <LoadingProvider>
                        <MessageProvider value={{ message, setMessage }}>
                            <FilterProvider value={{ filters, setFilters }}>
                                <Router>
                                    <Loading />
                                    <Header />
                                    <Switch>
                                        <PrivateRoute exact path="/" Component={Start} />
                                        <PublicRoute exact path="/login" Component={Login} />
                                        <PrivateRoute exact path="/logout" Component={Logout} />
                                        <PublicRoute exact path="/forgot" Component={Forgot} />
                                        <PublicRoute exact path="/reset/:code?" Component={Reset} />
                                    </Switch>
                                    <MessageSystem />
                                    <Footer />
                                </Router>
                            </FilterProvider>
                        </MessageProvider>
                    </LoadingProvider>
                </ApolloProvider>
            </CookiesProvider>
        </ThemeProvider >
    );
};

export default App;
