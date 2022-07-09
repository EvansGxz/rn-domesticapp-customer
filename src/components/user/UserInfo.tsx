import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import UserImage from "./UserImage";
import { useAuth } from "../../hooks/use-auth";
import { AuthContext } from "../../contexts/auth-context";


export default function UserInfo() {
    const [data, setData] = React.useState<any>();
    const auth = useContext(AuthContext);

    const state = auth.getState().user;
    const getState = () => setData({...state});
    
    useEffect(() => {
        getState();
        return () => setData({});
    }, [auth.getState()]);

    return (
        <View style={styles.container}>
            <View style={styles.directionRow}>
                <UserImage size={65} src={data?.image_url} />
                <Text style={styles.textName}>{data?.full_name}</Text>
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
