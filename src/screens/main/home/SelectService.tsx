/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { View, Text } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import type { HomeStackParamList } from '.';

// COMPONENTs
import Button from "../../../components/ui/Button";
import LineORSeparator from '../../../components/ui/LineORSeparator';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

// UTILs
import { SharedStyles } from "../../../styles/shared-styles";
import { useCalendar } from "../../../contexts/calendarContext";

type Props = StackScreenProps<HomeStackParamList, 'ServiceCalendar'>;

export default function SelectService({ navigation }: Props) {

  const _Picker: any = Picker;
  const { setworkday, workday } = useCalendar();
  useFocusEffect(useCallback(() => {
    setworkday("Jornada Completa");
  }, []));

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="ELIGE TU SERVICIO" />
      <View style={[{ paddingHorizontal: 35, paddingTop: 20 }, SharedStyles.fill]}>
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Tipo de jornada *</Text>
        <_Picker
          selectedValue={workday}
          style={[SharedStyles.card]}
          onValueChange={(itemValue: any) => setworkday(itemValue)}>
          <_Picker.Item label="Jornada Completa" value="Jornada Completa" />
          <_Picker.Item label="Media Jornada" value="Media Jornada" />
        </_Picker>
      </View>
      <View style={[SharedStyles.mainPadding, SharedStyles.centerContent]}>
        <Button style={SharedStyles.backgroundPrimary}>
          Seleccionar empleado
        </Button>
        <LineORSeparator />
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={() => navigation.navigate('ServiceCalendar')}>
          Continuar
        </Button>
      </View>
    </View>
  );
}
