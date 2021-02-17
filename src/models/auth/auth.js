/* 
 * Graphql - Auth
 */

import { useHistory } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuthToken, useUserRole, useUser, useBasket } from "config/auth";

const LOGIN = gql`
    mutation login($login: String!, $password: String!) {
        login(input: { identifier: $login, password: $password }) {
            jwt
        }
    }
`;

export const USER = gql`
    query user {
        me {
            id
            email
            role {
                name
            }
        }
    }
`;

export const useLoginMutation = () => {
    const [, setAuthToken, removeAuthtoken] = useAuthToken();
    const [getUser] = useUserQuery();

    const [mutation] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const newToken = data.login.jwt;

            removeAuthtoken();
            setAuthToken(newToken);
            // Add authToken manually, not fully processed in cookie yet
            getUser();
        },
    });

    const login = (user, password) => {
        return mutation({
            variables: {
                login: user,
                password,
            },
        });
    };

    return [login];
};

const useUserQuery = () => {
    const [, setUserRole, removeUserRole] = useUserRole();
    const [, setUser, removeUser] = useUser();
    const [, setBasket, removeBasket] = useBasket();
    const [token, , ] = useAuthToken();
    const history = useHistory();

    const [getUser] = useLazyQuery(USER, {
        // Adding the authToken manually, cookie not ready in login function
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        },
        onCompleted: (data) => {
            const role = data.me.role.name;
            const user = data.me;

            removeUserRole();
            setUserRole(role);

            removeUser();
            setUser(user);

            removeBasket();
            setBasket([]);

            history.push("/");
            window.location.reload();
        },
        onError: err => {
            console.log(err);
        }
    });

    return [getUser];
}