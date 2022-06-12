import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import OutlinedInput from "../../components/ui/OutlinedInput";
import UserImage from "../../components/user/UserImage";
import { SharedStyles } from "../../styles/shared-styles";

export default function Profile() {
    return (
        <SafeAreaView style={SharedStyles.mainScreen}>
            <UserImage />
            <OutlinedInput />
            <OutlinedInput />
            <OutlinedInput />
            <OutlinedInput />
            <OutlinedInput />
            <OutlinedInput />
            <Button>Continue</Button>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {

    }
});