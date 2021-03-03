/* 
 * Graphql - Auth
 */

import { useHistory } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useMessage } from 'components/messageSystem/Message';
import { useAuthToken, useUserRole, useUser, useItems } from "config/auth";

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
            info {
                firstname
                lastname
                department {
                    name
                }
            }
        }
    }
`;

const REGISTER = gql`
    mutation registerUser($input: createUserInput!) {
        createUser(input: $input) {
            user {
                username
                firstname
                lastname
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
    const [, setUserRole, removeUserRole] = useUserRole(),
          [, setUser, removeUser] = useUser(),
          [, setItems, removeItems] = useItems(),
          [token, , ] = useAuthToken(),
          history = useHistory();

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

            removeItems();
            setItems([]);

            history.push("/");
            window.location.reload();
        },
        onError: err => {
            console.log(err);
        }
    });

    return [getUser];
}

export const useRegisterUser = () => {
    const messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          history = useHistory();

    const [RegisterUserMutation] = useMutation(REGISTER, {
        onError: (err) => {
            console.log(err);
            setMessage({ open: true, text: `Epostadressen eller taggen är redan registrerade!  Testa att logga in istället.`, severity: "error" });
        },
        onCompleted: (data) => {
            history.push("/login");
            setMessage({ open: true, text: `Nu kan du logga in!`, severity: "success" });
        }
    });

    const registerUser = (data) => {
        return RegisterUserMutation({ variables: { input: { data } } });
    };

    return [registerUser];
};