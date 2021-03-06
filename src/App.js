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
import { MessageProvider } from "components/messageSystem/Message";
import { TabProvider } from "components/tab/Tab";
import MessageSystem from "components/messageSystem/MessageSystem";

// Page components
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Buy from 'components/buy/Buy';
import Me from 'components/me/Me';

// Auth components
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import Register from 'components/auth/Register';
import Forgot from 'components/auth/Forgot';
import Reset from 'components/auth/Reset';
import PublicRoute from 'components/auth/PublicRoute';
import PrivateRoute from 'components/auth/PrivateRoute';

const App = () => {
    const apolloClient = useAppApolloClient();
    const [message, setMessage] = useState({ open: false, text: "", severity: "success" });
    const [tab, setTab] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CookiesProvider>
                <ApolloProvider client={apolloClient}>
                    <LoadingProvider>
                        <MessageProvider value={{ message, setMessage }}>
                            <TabProvider value={{ tab, setTab }}>
                                <Router>
                                    <Loading />
                                    <Header />
                                    <Switch>
                                        <PrivateRoute exact path="/" Component={Buy} />
                                        <PrivateRoute exact path="/me" Component={Me} />
                                        <PublicRoute exact path="/login" Component={Login} />
                                        <PrivateRoute exact path="/logout" Component={Logout} />
                                        <PublicRoute exact path="/register" Component={Register} />
                                        <PublicRoute exact path="/forgot" Component={Forgot} />
                                        <PublicRoute exact path="/reset/:code?" Component={Reset} />
                                    </Switch>
                                    <MessageSystem />
                                    <Footer />
                                </Router>
                            </TabProvider>
                        </MessageProvider>
                    </LoadingProvider>
                </ApolloProvider>
            </CookiesProvider>
        </ThemeProvider >
    );
};

export default App;
