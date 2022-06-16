import React from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import OutlinedInput from "../../components/ui/OutlinedInput";
import UserImage from "../../components/user/UserImage";
import { SharedStyles } from "../../styles/shared-styles";

export default function Profile() {
    return (
        <SafeAreaView style={SharedStyles.mainScreen}>
            <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding, styles.containerCenter]}>
                <View style={[SharedStyles.centerContent, { marginVertical: 30 }]}>
                    <UserImage size={100} />
                </View>
                <Text style={styles.h2}>Nombre completo / empresa</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Correo electronico</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>CC/NIT</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Fecha de Nacimiento</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Compañia</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Código Referido</Text>
                <OutlinedInput style={styles.input} />
                <Button style={SharedStyles.backgroundPrimary}>Continuar</Button>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerCenter: {
    },
    input: {
        padding: 10,
        marginBottom: 25
    },
    h2: {
        ...SharedStyles.h2,
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Poppins_500Medium',
        fontSize: 17
    }
});