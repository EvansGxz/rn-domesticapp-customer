import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../../../config";
import { SharedStyles } from "../../styles/shared-styles";
import UserImage from "../user/UserImage";

export default function ServiceStatusCard(props: any) {
    const status = {
        "employee":{
            full_name: "Maria del refugio",
            active: "Activo"
        },
    }
    // console.log("img"+status.image_url)
    return (
        <>
            <View style={styles.container}>
               <UserImage size={60} sourceImage />
                <View style={styles.rightSide}>
                    <Text style={styles.name}>{status.employee.full_name}</Text>
                    <Text numberOfLines={1}>Limpieza de ropa, Doblado de Ropa</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>{status.employee.active ? 'Activo' : 'No Activo'}</Text>
                    </View>
                </View>
            </View>
            <View style={SharedStyles.bottomLine} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightSide: {
        flex: 1,
        marginLeft: 10
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    name: {
        fontWeight: '500',
        fontSize: 18
    },
    statusText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: '600'
    }
});