import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import DatePicker from 'react-native-date-picker';
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";

export default function ServiceCalendar() {
    const [selectedValue, setSelectedValue] = useState(new Date());
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
                        setMarkedDates({ [day.dateString]: { selectedColor: COLORS.primary, selected: true } })
                    }}
                    markedDates={markedDates}
                />
                <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Hora de inicio</Text>
                <View style={{ height: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                    <DatePicker androidVariant='iosClone' dividerHeight={0}  mode='time' date={selectedValue} onDateChange={setSelectedValue} />
                </View>
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