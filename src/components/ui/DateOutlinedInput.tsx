import React, { useState } from "react";
import { TextInput, Modal, TextInputProps, StyleSheet, View, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { COLORS } from "../../../config";
import CalendarSVG from '../../resources/img/menu/calendar.svg';
import { Calendar } from "react-native-calendars";
import { SharedStyles } from "../../styles/shared-styles";

export interface DateOutlinedInputProps extends TextInputProps {
    inputRef?: any;
    containerStyle?: StyleProp<ViewStyle>;
}

export default function DateOutlinedButton(props: DateOutlinedInputProps) {
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
            <View style={[style.container]}>
                <TextInput 
                    {...props}
                    ref={props.inputRef}
                    style={[props.style, style.input]}
                    keyboardType="numeric"
                    placeholder="dd/mm/aaaa"
                    onChangeText={onChangeText}
                />
                <TouchableOpacity style={style.icon} onPress={toggleModal}>
                    <CalendarSVG />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalOpened}
            >
                <View style={[SharedStyles.fill, SharedStyles.centerContent, { position: 'relative' }]}>
                    <TouchableOpacity onPress={toggleModal} style={[SharedStyles.fill, style.backdrop]}></TouchableOpacity>
                    <Calendar 
                        style={[SharedStyles.card, { minWidth: '90%' }]}
                    />
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