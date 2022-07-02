import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { Picker } from '@react-native-picker/picker';
import Button from "../../../components/ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../../config";

export default function ServiceCalendar() {
    const [selectedValue, setSelectedValue] = useState('1');
    const navigation = useNavigation<any>();
    const route = useRoute();
    const [markedDates, setMarkedDates] = useState({});

   
   
    
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Apuntalo en mi agenda" />
            <View style={[SharedStyles.mainPadding, SharedStyles.fill]}>
                <Calendar 
                    markingType="dot"
                    style={SharedStyles.mb} 
                    onDayPress={day => {
                        setMarkedDates({ date:[day.dateString],[day.dateString]: { selectedColor: COLORS.primary, selected: true } })
                    }}
                    markedDates={markedDates}
                />
                <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Hora de inicio</Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={[SharedStyles.card]}
                >
                    <Picker.Item label="07:00" value="1" />
                    <Picker.Item label="08:00" value="2" />
                    <Picker.Item label="09:00" value="3" />
                    <Picker.Item label="10:00" value="4" />
                    <Picker.Item label="11:00" value="5" />
                    <Picker.Item label="12:00" value="6" />
                    <Picker.Item label="01:00" value="7" />
                    <Picker.Item label="02:00" value="8" />
                    <Picker.Item label="03:00" value="9" />
                    <Picker.Item label="04:00" value="10" />
                </Picker>
            </View>
            <View style={SharedStyles.mainPadding}>
                <Button
                    style={SharedStyles.backgroundPrimary}
                    onPress={
                        () => navigation.navigate(
                            'ServiceRecurrentSelection',
                            { ...route.params, workingHour: selectedValue, working: markedDates }
                        )
                    }
                >
                    Continuar
                </Button>
            </View>
        </View>
    );
}