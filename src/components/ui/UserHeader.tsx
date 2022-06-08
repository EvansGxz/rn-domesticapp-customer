import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

const sourceImage = 'https://eldiariony.com/wp-content/uploads/sites/2/2022/04/GettyImages-100964340.jpg?quality=60&strip=all&w=1200';

export default function UserHeader() {
    return (
        <View style={style.headerContainer}>
            <ImageBackground
                imageStyle={style.userImageCenter} 
                style={style.userImage} 
                source={{ uri: sourceImage }} 
            />
            <View>
                <Text style={style.mainText}>Hola, <Text style={style.boldText}>John Doe</Text>!</Text>
                <Text style={style.textEmail}>customer@mail.com</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        height: 70,
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