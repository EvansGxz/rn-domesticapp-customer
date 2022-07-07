import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useFetch from "use-http";
import UserImage from "./UserImage";



export default function UserInfo() {
    const { loading, error, data = {} } = useFetch('/profile', {}, []);
    console.log({ data });
    console.log(loading);
    console.log(error);
    return (
        <View style={styles.container}>
            <View style={styles.directionRow}>
                <UserImage size={65} src={data.image_url} />
                <Text style={styles.textName}>{data.full_name}</Text>
            </View>
            {/*<Text style={styles.servicesCount}>325 Servicios Solicitados</Text>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    directionRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    textName: {
        fontSize: 32,
        maxWidth: '70%'
    },
    servicesCount: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#787B82'
    }
});
