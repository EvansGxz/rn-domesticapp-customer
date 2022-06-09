import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const exampleCategory = 'https://domesticapp-api.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--659a39b7ef13fca9d096fa08113988cbdbc6755a/cat4';


export default function ServiceTypeButton() {
    return (
        <TouchableOpacity style={styles.button}>
            <Image style={styles.serviceImg} source={{ uri: exampleCategory }} />
            <Text style={styles.serviceText}>Agricultura</Text>
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