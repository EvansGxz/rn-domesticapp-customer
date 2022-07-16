/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import DatePicker from 'react-native-date-picker';
import type { HomeStackParamList } from ".";
// UTILs
import { COLORS } from "../../../../config";
import { useCalendar } from "../../../contexts/calendarContext";
import { SharedStyles } from "../../../styles/shared-styles";

// COMPONENTs
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";

import moment from 'moment';

type Props = StackScreenProps<HomeStackParamList, 'ServiceRecurrentSelection'>;

export default function ServiceCalendar({ navigation }: Props) {
  const _DatePicker: any = DatePicker;
  const [markedDates, setMarkedDates] = useState<any>();
  const [serviceDates, setServiceDates] = useState<Date | string>(new Date());
  const { setstart_date, setservice_time } = useCalendar();

  useEffect(() => {
    setservice_time(moment(serviceDates).format('hh:mm a'))
  },[]);

  useEffect(() => {
    const newDate = moment().format('L');
    let replace = newDate.replace('/','-');
    replace = replace.replace('/','-');
    setstart_date(replace)
  },[]);

  useEffect(() => {
    if (serviceDates) {
      setservice_time(moment(serviceDates).format('hh:mm a'));
    }
  }, [serviceDates]);

  useEffect(() => {
    if (markedDates) {
      setstart_date(markedDates.date[0]);
    }
  }, [markedDates]);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Apuntalo en mi agenda" />
      <View style={[SharedStyles.mainPadding, SharedStyles.fill]}>
        <Calendar
          markingType="dot"
          style={SharedStyles.mb}
          markedDates={markedDates}
          onDayPress={day => {
            setMarkedDates({ date: [day.dateString], [day.dateString]: { selectedColor: COLORS.primary, selected: true } })
          }}
        />
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Hora de inicio</Text>
        <View style={{ height: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
          <_DatePicker
            mode='time'
            date={serviceDates}
            textColor={COLORS.primary}
            onDateChange={(date: Date) => setServiceDates(date)} />
        </View>
      </View>
      <View style={SharedStyles.mainPadding}>
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={() => navigation.navigate('ServiceRecurrentSelection')}>
          Continuar
        </Button>
      </View>
    </View>
  );
}
