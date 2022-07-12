/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TextInput, Modal, TextInputProps, StyleSheet, View, StyleProp, ViewStyle, TouchableOpacity, Pressable } from "react-native";
import { COLORS } from "../../../config";
import CalendarSVG from '../../resources/img/menu/calendar.svg';
import { Calendar } from "react-native-calendars";
import { SharedStyles } from "../../styles/shared-styles";

export interface DateOutlinedInputProps extends TextInputProps {
    inputRef?: any;
    containerStyle?: StyleProp<ViewStyle>;
    onChangeText: (data: any) => void;
}

const formatDate = (date: Date) => {
    const day = date.getDate() < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1);
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
}

export default function DateOutlinedButton(props: DateOutlinedInputProps) {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const toggleModal = () => setIsModalOpened(!isModalOpened);

    return (
        <>
            <Pressable style={[style.container]} onPress={toggleModal}>
                <TextInput 
                    {...props}
                    ref={props.inputRef}
                    style={[props.style, style.input]}
                    keyboardType="numeric"
                    placeholder="dd/mm/aaaa"
                />
                <View style={style.icon}>
                    <CalendarSVG />
                </View>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalOpened}>
                <View style={[SharedStyles.fill, SharedStyles.centerContent, { position: 'relative' }]}>
                    <TouchableOpacity onPress={toggleModal} style={[SharedStyles.fill, style.backdrop]}></TouchableOpacity>
                    <Calendar style={[SharedStyles.card, { minWidth: '90%' }]} onDayPress={(date) => {
                        toggleModal();
                        props.onChangeText && props.onChangeText(formatDate(new Date(date.timestamp)))
                    } } />
                </View>
            </Modal>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderRadius: 13,
        borderWidth: 2,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    input: {
        flex: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 24
    },
    icon: {
        marginRight: 10
    }
});