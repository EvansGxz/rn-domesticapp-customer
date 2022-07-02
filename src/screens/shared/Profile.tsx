import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity,StyleProp, ViewStyle, Modal, TextInputProps,TextInput,  TouchableWithoutFeedback  } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import OutlinedInput from "../../components/ui/OutlinedInput";
import UserImage from "../../components/user/UserImage";
import { SharedStyles } from "../../styles/shared-styles";
import BackTitledHeader from "../../../src/components/headers/BackTitledHeader";
import { Calendar, CalendarList } from "react-native-calendars";
import { Keyboard } from 'react-native';

export interface DateOutlinedInputProps extends TextInputProps {
    inputRef?: any;
    containerStyle?: StyleProp<ViewStyle>;
}

export default function Profile(props: DateOutlinedInputProps) {
    const [calendarData, setCalendarData] = useState("");
    const [isModalOpened, setIsModalOpened] = useState(false);
    const toggleModal = () => setIsModalOpened(!isModalOpened);
    

    const onChangeText = (val: string) => {
        if (val.length > 10) return;
        if (val.length === 2 || val.length === 5)
            return (props.onChangeText || ((val) => {}))(val + '/');
        (props.onChangeText || ((val) => {}))(val);
    }
    return (
    <>
        <SafeAreaView style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Editar Mi Perfil" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding, styles.containerCenter]}>
                <View style={[SharedStyles.centerContent, { marginVertical: 30 }]}>
                    <UserImage size={100} />
                </View>
                <Text style={styles.h2}>Nombre completo / empresa</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Correo electronico</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Tipo de identificación</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Fecha de Nacimiento</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View  style={[styles.container]}>
                        <TextInput
                            {...props}
                            ref={props.inputRef}
                            style={[props.style, styles.inputCalendar]}
                            keyboardType='numeric'
                            onChangeText={onChangeText}
                            onPressIn={toggleModal}
                            value={calendarData.toString()}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.h2}>Compañia</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Código Referido</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Tipo de cliente</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Dirección</Text>
                <OutlinedInput style={styles.input} />
                <Text style={styles.h2}>Teléfono</Text>
                <OutlinedInput style={styles.input} />
                <Button style={SharedStyles.backgroundPrimary}>Continuar</Button>
            </ScrollView>
            <Footer />
        </SafeAreaView>
        <Modal
                animationType="slide"
                transparent={true}
                visible={isModalOpened}
            >
                <View style={[SharedStyles.fill, SharedStyles.centerContent, { position: 'relative' }]}>
                    <TouchableOpacity onPress={toggleModal} style={[SharedStyles.fill, styles.backdrop]}></TouchableOpacity>
                    <Calendar
                    enableSwipeMonths={true}
                    onDayPress={day => {
                        setCalendarData(day.dateString);
                      }}
                        style={[SharedStyles.card, { minWidth: '90%' }]}
                    />
                </View>
            </Modal>
    </>
    );
}

export function calendarActivate() {
    return(
        alert("hola")
    );
}

const styles = StyleSheet.create({
    containerCenter: {
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderRadius: 13,
        borderWidth: 2,
    },
    input: {
        padding: 10,
        marginBottom: 25
    },
    inputCalendar: {
        flex: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 24
    },
    h2: {
        ...SharedStyles.h2,
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Poppins_500Medium',
        fontSize: 17
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
});