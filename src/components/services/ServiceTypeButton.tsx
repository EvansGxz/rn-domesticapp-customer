import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const exampleCategory = 'https://domesticapp-api.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--659a39b7ef13fca9d096fa08113988cbdbc6755a/cat4';


export default function ServiceTypeButton() {
    return (
        <TouchableOpacity>
            <Image source={{ uri: exampleCategory }} />
            <Text>Agricultura</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

});