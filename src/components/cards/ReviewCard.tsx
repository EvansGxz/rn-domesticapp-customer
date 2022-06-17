import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import RatingBar from "../ui/RatingBar";

export default function ReviewCard() {
    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Elon Musk
                </Text>
                <Text>
                    Un trabajo impecable!
                </Text>
            </View>
            <RatingBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
});