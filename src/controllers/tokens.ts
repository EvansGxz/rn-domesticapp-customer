import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (err) {
        console.log(err);
    }
}

export const retrieveToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (err) {
        console.log(err);
    }
}

export const retrieveTokenHeader = async () => {
    return `Token token=${await retrieveToken()}`;
}

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (err) {
        console.log(err);
    }
}