import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const exampleCategory = 'https://domesticapp-api.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--659a39b7ef13fca9d096fa08113988cbdbc6755a/cat4';


export interface ServiceTypeButtonProps {
    id: number;
    image: string;
    name: string;
}

export default function ServiceTypeButton(props: ServiceTypeButtonProps) {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SelectService', { id: props.id })}
        >
            <Image style={styles.serviceImg} source={{ uri: props.image }} />
            <Text style={styles.serviceText}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '45%',
        alignItems: 'center',
        marginBottom: 20
    },
    serviceImg: {
        width: 115,
        height: 115,
    },
    serviceText: {
        fontSize: 16,
        marginTop: 5
    }
});