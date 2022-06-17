import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useReducer } from "react"
import { Alert } from "react-native";
import { httpClient } from "../controllers/http-client";
import { deleteToken, retrieveToken, retrieveTokenHeader, saveToken } from "../controllers/tokens";

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
            socialSignIn: async (credentials: any, img: string) => {
                try {
                    const { data: { token, ...user }} = await httpClient.post(
                        '/login_social',
                        credentials
                    );
                    
                    await saveToken(token);
                    console.log('logged in')

                    await httpClient.patch(
                        '/profile',
                        { image_url: img },
                        { headers: { Authorization: await retrieveTokenHeader() } }
                    );

                    console.log('image changed')

                    dispatch({ type: 'SIGN_IN', user });
                } catch (err) {
                    console.log(err);
                    console.log((err as any).message);
                    Alert.alert('Error', ((err as AxiosError).response?.data as any).errors);
                }
            },
            phoneSignIn: async (credentials: any) => {
                try {
                    const { data: { token, ...user }} = await httpClient.post(
                        '/login_phone',
                        credentials
                    );
                    
                    await saveToken(token);
                    console.log('logged in')

                    dispatch({ type: 'SIGN_IN', user });
                } catch (err) {
                    console.log(err);
                    console.log((err as any).message);
                    Alert.alert('Error', ((err as AxiosError).response?.data as any).errors);
                }
            },
            loadSession: async (token: string, user: any) => {
                await saveToken(token);
                dispatch({ type: 'SIGN_IN', user });
            },
            signOut: async () => {
                try {
                    await httpClient.delete(
                        '/logout',
                        {
                            headers: { Authorization: await retrieveTokenHeader() }
                        }
                    );
                    
                    await deleteToken();

                    dispatch({ type: 'SIGN_OUT' });
                } catch (err) {
                    await deleteToken();

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
                    retrieveToken().then(async (token) => {
                        try {
                            console.log('Token: ', token)
                            if (!token) return dispatch({ type: 'SIGN_OUT' });
                            const result = await httpClient.get('/profile',
                                { headers: { Authorization: await retrieveTokenHeader() } }
                            );
                            console.log(result);
                            dispatch({ type: 'SIGN_IN', user: result });
                        } catch (err) {
                            console.log(err);
                            await AsyncStorage.removeItem('token');
                            dispatch({ type: 'SIGN_OUT' });
                        }
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
