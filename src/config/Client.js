/*
 * Client - config
 */

import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { useAuthToken } from "./auth";

export const uri = "https://domain.pamosystems.com";

const httpLink = new HttpLink({ 
    uri: `${uri}/graphql`,
    credentials: 'same-origin'
});

const authMiddleware = (authToken) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [authToken] = useAuthToken();

    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink),
        cache
    });
};