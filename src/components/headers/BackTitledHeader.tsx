import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackIcon from '../../resources/img/ui/back-button.svg';
import { useNavigation } from "@react-navigation/native";

export interface BackTitledHeaderProps {
    title: string;
}

export default function BackTitledHeader(props: BackTitledHeaderProps) {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <BackIcon 
                onPress={() => navigation.canGoBack() ? navigation.goBack() : null} 
            />
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        flexDirection: 'row'
    },
    title: {
        color: '#82868D',
        fontSize: 24,
        fontWeight: '600',
        marginLeft: 20,
        flex: 1
    }
});