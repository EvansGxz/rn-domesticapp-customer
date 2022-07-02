import React from "react";
import { View, StyleSheet, Text } from "react-native";
import useFetch from "use-http";
import UserImage from "../user/UserImage";

export default function UserHeader() {
    const { loading, error, data = {} } = useFetch('/profile', {}, []);
    console.log(data);
    // console.log(loading);
    // console.log(error);
    return (
        <View style={style.headerContainer}>
            <UserImage src={data.image_url} />
            <View>
                <Text style={style.mainText}>Hola, <Text style={style.boldText}>{data.full_name}</Text>!</Text>
                <Text style={style.textEmail}>{data.email}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 20
    },
    mainText: {
        fontSize: 20,
        marginBottom: -5
    },
    boldText: {
        fontWeight: 'bold'
    },
    textEmail: {
        opacity: 0.6
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 150,
        marginRight: 12.5
    },
    userImageCenter: {
        resizeMode: 'center',
        borderRadius: 150
    },
});