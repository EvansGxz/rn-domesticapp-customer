import { AxiosError } from "axios";
import { useEffect, useMemo, useReducer } from "react"
import { Alert } from "react-native";
import { httpClient } from "../controllers/http-client";
import { retrieveToken, retrieveTokenHeader, saveToken } from "../controllers/tokens";

export const useAuth = () => {
    const [user, dispatch] = useReducer(
        authReducer,
        {
            loading: true,
            user: null
        }
    );

    const authFunctions = useMemo(
        () => ({
            signIn: async (credentials: any) => {
                try {
                    const { data: { token, ...user }} = await httpClient.post(
                        '/login',
                        credentials
                    );
                    console.log(token);
                    await saveToken(token);
                    dispatch({ type: 'SIGN_IN', user });
                } catch (err) {
                    Alert.alert('Error', ((err as AxiosError).response?.data as any).errors);
                }
            },
            loadSession: async (token: string, user: any) => {
                await saveToken(token);
                dispatch({ type: 'SIGN_IN', user });
            },
            signOut: async () => {
                try {
                    const logoutResponse = await httpClient.delete(
                        '/logout',
                        {
                            headers: { Authorization: await retrieveTokenHeader() }
                        }
                    );
                    console.log(logoutResponse);
                    dispatch({ type: 'SIGN_OUT' });
                } catch (err) {
                    console.log(err);
                }
            },
            getState() {
                return user;
            }
        }),
        [user]
    );

    useEffect(
        () => {
            console.log('Loading APP.')
            setTimeout(
                () => {
                    console.log('Checking token.')
                    retrieveToken().then((token) => {
                        console.log('Token: ', token)
                        if (!token) return dispatch({ type: 'SIGN_OUT' });
                        dispatch({ type: 'SIGN_IN', user: {} });
                    })
                }, 
                1000
            );
        },
        []
    );

    return [user, authFunctions];
}

const authReducer: React.Reducer<any, any> = (prev, action) => {
    console.log(action);
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...prev,
                loading: false,
                user: action.user
            }
        case 'SIGN_OUT':
            return {
                ...prev,
                loading: false,
                user: null
            }
        case 'LOADING':
            return {
                ...prev,
                loading: true
            }
        default:
            return prev;
    }
}
