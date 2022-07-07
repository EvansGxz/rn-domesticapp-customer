import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import DatePicker from 'react-native-date-picker';
import { getCalendarContext } from ".";
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";

export default function ServiceCalendar() {
    const [selectedValue, setSelectedValue] = useState<Date>(new Date());
    const navigation = useNavigation<any>();
    const route = useRoute();
    const [markedDates, setMarkedDates] = useState<any>();

    const _DatePicker: any = DatePicker;

    const { setstart_date, setservice_time } = getCalendarContext()

    useEffect( () => {
        setservice_time(selectedValue.toISOString().substring(selectedValue.toISOString().indexOf('T') + 1, selectedValue.toISOString().indexOf('T') + 9))
    }, [selectedValue] )

    useEffect( () => {
        if(markedDates ){
            setstart_date(markedDates.date[0]);
        }
    }, [markedDates] )
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
                <View style={{ height: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                    <_DatePicker androidVariant='iosClone' dividerHeight={0}  mode='time' date={selectedValue} onDateChange={setSelectedValue} />
                </View>
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
