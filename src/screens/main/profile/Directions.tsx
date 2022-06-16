import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import { SharedStyles } from "../../../styles/shared-styles";
import WoldSVG from '../../../resources/img/ui/gps.svg';
import CheckSVG from '../../../resources/img/ui/check.svg';

export default function Directions() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Direcciones" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <OutlinedInput style={styles.input} placeholder="Ingresa direccion a laborar" />
                <View style={{ marginTop: 20 }}>
                    <MenuOption 
                        icon={CheckSVG}
                        size={30}
                        text="Calle 53 #23-46"
                    />
                    <MenuOption 
                        icon={WoldSVG}
                        size={30}
                        text="Calle 53 #59-30"
                    />
                    <MenuOption 
                        icon={WoldSVG}
                        size={30}
                        text="Calle 53 #59-30"
                    />
                    <MenuOption 
                        icon={WoldSVG}
                        size={30}
                        text="Calle 53 #59-30"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10
    }
});