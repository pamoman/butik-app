/* 
 * Graphql - Auth
 */

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useMessage } from 'components/messageSystem/Message';
import { useAuthToken, useUserRole, useUser, useDepartment, useItems } from "config/auth";

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
                    id
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

const UPDATE_USER = gql`
    mutation updateUser($input: updateUserInput!) {
        updateUser(input: $input) {
            user {
                username
                firstname
                lastname
                email
                department {
                    name
                }
            }
        }
    }
`;

export const useLoginMutation = () => {
    const [, setAuthToken, removeAuthtoken] = useAuthToken();
    const [getUser] = useUserQuery("/");

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

const useUserQuery = (redirect = false) => {
    const [, setUserRole] = useUserRole(),
          [, setUser] = useUser(),
          [, setDepartment] = useDepartment(),
          [, setItems] = useItems(),
          [token, , ] = useAuthToken();

    const [getUser] = useLazyQuery(USER, {
        // Adding the authToken manually, cookie not ready in login function
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            const user = data.me;
            const role = data.me.role.name;
            const department = data.me.info.department.id;

            setUserRole(role);
            setUser(user);
            setDepartment(department);
            setItems([]);

            redirect && (window.location.href = "/");
        },
        onError: err => {
            console.log(err);
        }
    });

    return [getUser];
}

export const useRegisterUser = () => {
    const messageContext = useMessage(),
          setMessage = messageContext.setMessage;

    const [RegisterUserMutation] = useMutation(REGISTER, {
        onError: (err) => {
            console.log(err);
            setMessage({ open: true, text: `Epostadressen eller taggen är redan registrerade!  Testa att logga in istället.`, severity: "error" });
        },
        onCompleted: () => {
            window.location.href = "/login";
            setMessage({ open: true, text: `Nu kan du logga in!`, severity: "success" });
        }
    });

    const registerUser = (data) => {
        return RegisterUserMutation({ variables: { input: { data } } });
    };

    return [registerUser];
};

export const useUpdateUser = () => {
    const messageContext = useMessage(),
          setMessage = messageContext.setMessage,
          [getUser] = useUserQuery();

    const [UpdateUserMutation] = useMutation(UPDATE_USER, {
        onError: (err) => {
            console.log(err);
        },
        onCompleted: () => {
            getUser();
            setMessage({ open: true, text: `Sparat!`, severity: "success" });
        }
    });

    const updateUser = (where, data) => {
        return UpdateUserMutation({ variables: { input: { where, data } } });
    };

    return [updateUser];
};