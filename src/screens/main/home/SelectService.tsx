/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import type { HomeStackParamList } from '.';

// COMPONENTs
import Button from "../../../components/ui/Button";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

// UTILs
import { SharedStyles } from "../../../styles/shared-styles";
import { useCalendar } from "../../../contexts/calendarContext";

type Props = StackScreenProps<HomeStackParamList, 'SelectService'>;

export default function SelectService({ route, navigation }: Props) {
  const [selectedValue, setSelectedValue] = useState<any>();

  const _Picker: any = Picker;
  const { setworkday } = useCalendar();
  useFocusEffect(useCallback(() => {
    setworkday("Jornada Completa");
    // setSelectedValue("Jornada Completa");
  }, []));

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="ELIGE TU SERVICIO" />
      <View style={[{ paddingHorizontal: 35, paddingTop: 20 }, SharedStyles.fill]}>
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Tipo de jornada *</Text>
        <_Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue: any) => {
            setworkday(itemValue)
            setSelectedValue(itemValue)
          }}
          style={[SharedStyles.card]}>
          <_Picker.Item label="Jornada Completa" value="Jornada Completa" />
          <_Picker.Item label="Media Jornada" value="Media Jornada" />
        </_Picker>
      </View>
      <View style={[SharedStyles.mainPadding, SharedStyles.centerContent]}>
        {/* <Button style={SharedStyles.backgroundPrimary}>
          Seleccionar empleado
        </Button>
        <LineORSeparator /> */}
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={
            () => navigation.navigate(
              'ServiceCalendar',
              { ...route.params, workingDayType: selectedValue }
            )
          }>
          Continuar
        </Button>
      </View>
    </View>
  );
}
