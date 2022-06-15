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
            <BackTitledHeader title="APUNTALO EN MI AGENDA" />
            <View style={[SharedStyles.mainPadding, SharedStyles.fill]}>
                <Calendar 
                    markingType="dot"
                    style={SharedStyles.mb} 
                    onDayPress={day => {
                        setMarkedDates({ [day.dateString]: { selectedColor: COLORS.primary, selected: true } })
                    }}
                    markedDates={markedDates}
                />
                <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Hora de inicio</Text>
                <Picker 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={[SharedStyles.card]}
                >
                    <Picker.Item label="11:00" value="1" />
                    <Picker.Item label="12:00" value="2" />
                    <Picker.Item label="13:00" value="3" />
                </Picker>
            </View>
            <View style={SharedStyles.mainPadding}>
                <Button 
                    style={SharedStyles.backgroundPrimary}
                    onPress={
                        () => navigation.navigate(
                            'ServiceRecurrentSelection', 
                            { ...route.params, workingDayType: selectedValue  }
                        )
                    }
                >
                    Continuar
                </Button>
            </View>
        </View>
    );
}