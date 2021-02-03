/* 
 * Graphql - Auth
 */

import { useHistory } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuthToken, useUserRole } from "config/auth";

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

export const ROLE = gql`
    query user {
        me {
            role {
                name
            }
        }
    }
`;

export const useLoginMutation = () => {
    const [, setAuthToken, removeAuthtoken] = useAuthToken();
    const [getUserRole] = useUserRoleQuery();

    const [mutation] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const newToken = data.login.jwt;

            removeAuthtoken();
            setAuthToken(newToken);
            // Add authToken manually, not fully processed in cookie yet
            getUserRole();
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

const useUserRoleQuery = () => {
    const [, setUserRole, removeUserRole] = useUserRole();
    const [token, , ] = useAuthToken();
    const history = useHistory();

    const [getUserRole] = useLazyQuery(ROLE, {
        // Adding the authToken manually, cookie not ready in login function
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        },
        onCompleted: (data) => {
            const role = data.me.role.name;

            removeUserRole();
            setUserRole(role);

            history.push("/");
            window.location.reload();
        },
        onError: err => {
            console.log(err);
        }
    });

    return [getUserRole];
}