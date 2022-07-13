/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../components/ui/Button";
import DateOutlinedButton from "../../../components/ui/DateOutlinedInput";
import { useCalendar } from "../../../contexts/calendarContext";

import type { HomeStackParamList } from '.';
type Props = StackScreenProps<HomeStackParamList, 'ServiceRecurrentSelection', 'ServiceDetails'>;

export default function ServiceRecurrentSelection({ route, navigation }: Props) {
  const _Picker: any = Picker;

  const [repeatQuote, setRepeatQuote] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('diario');
  const [recurrencyDate, setRecurrencyDate] = useState({date: ''});

  const { setfinish_date } = useCalendar();

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="RECURRENCIA" />
      <ScrollView style={SharedStyles.fill} contentContainerStyle={{ paddingHorizontal: 35, paddingTop: 20 }}>
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Repetir cita</Text>
        <_Picker
          selectedValue={repeatQuote}
          onValueChange={(itemValue: boolean) => setRepeatQuote(itemValue)}
          style={[SharedStyles.card, SharedStyles.mb]}>
          <_Picker.Item label="No" value={false} />
          <_Picker.Item label="Sí" value={true} />
        </_Picker>
        {
          repeatQuote && (
            <>
              <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Frecuencia</Text>
              <_Picker
                selectedValue={quote}
                onValueChange={(itemValue: any) => setQuote(itemValue)}
                style={[SharedStyles.card, SharedStyles.mb]}>
                <_Picker.Item label="Diario" value="diario" />
                <_Picker.Item label="Semanal" value="semanal" />
                <_Picker.Item label="Quincenal" value="quincenal" />
                <_Picker.Item label="Mensual" value="mensual" />
              </_Picker>
              <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Fecha limite</Text>
              <DateOutlinedButton
                editable={false}
                onChangeText={(date) => {
                  const [a, b, c] = date.split('/');
                  setfinish_date(`${c}-${b}-${a}`);
                  setRecurrencyDate({ ...recurrencyDate, date })
                }}
                value={recurrencyDate.date}
              />
            </>
          )
        }
      </ScrollView>
      <View style={[SharedStyles.mainPadding, SharedStyles.centerContent]}>
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={
            () => navigation.navigate(
              'ServiceDetails',
              { ...route.params, quote, recurrencyDate }
            )
          }
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}