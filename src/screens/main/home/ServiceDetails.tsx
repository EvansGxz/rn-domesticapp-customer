/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StackScreenProps } from "@react-navigation/stack";

import Checkbox from 'expo-checkbox';
import { httpClient } from "../../../controllers/http-client";
import { SharedStyles } from "../../../styles/shared-styles";

// COMPONENTs
import Button from "../../../components/ui/Button";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import { useCalendar } from "../../../contexts/calendarContext";

import type { HomeStackParamList } from '.';
import { useAuth } from "../../../hooks/use-auth";
import { COLORS } from "../../../../config";
import { PayloadActionKind } from "../../../contexts/authReducer";
type Props = StackScreenProps<HomeStackParamList, 'ServiceDetails'>;

export default function ServiceDetails({ navigation }: Props) {
  const {state, dispatch} = useAuth();

  const [isChecked, setChecked] = useState<boolean[]>([false]);
  const [recurrency, setSelectedValue] = useState(false);
  const [datas, setDatas] = useState({
    ccNit: 'CC',
    food: '1',
    specifyTasks: false
  });

  const checkList = ["Trapear", "Lavar", "Tarea", "Barrer", "Cocinar"];
  const { category_id, start_date, service_time, workday, finish_date, address } = useCalendar();
  const saveService = async () => {
    dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: true}});
    try {
      const formData = {
        category_id: parseInt(category_id),
        employee_id: 10,
        customer_id: parseInt(state.user.id),
        discount: '0',
        address,
        start_date,
        workday,
        finish_date,
        service_time,
        supply_food: "no"
      }
      // console.log('==================>',formData);
      const response = await httpClient.post(`/order_details`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token token=${state.user .token}`
        }
      });
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
      navigation.navigate('TodoListo', { params: response.data });
      console.log('<<<<<<<================================>>>>>> PASA <<<<<<<================================>>>>>>')
    } catch (error: any) {
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
      console.log('<<<<<<<================================>>>>>> ERROR <<<<<<<================================>>>>>>')
      console.log(error.response.data);
    }

    // console.log(response);

  }

  const _Picker: any = Picker;
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="DETALLES" />
      <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding]}>
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Correo de Notificación</Text>
        <OutlinedInput style={styles.input} value={state.user.email} editable={false} />
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Tipo de identificación</Text>
        <OutlinedInput style={styles.input} value={state.user.document_type?.toUpperCase()} editable={false} />
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Celular</Text>
        <OutlinedInput style={styles.input} value={state.user.phone} editable={false} />
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>No. De documento</Text>
        <OutlinedInput style={styles.input} value={state.user.document_id} editable={false} />
        <Text style={[SharedStyles.h3, { marginBottom: 10 }]}>Especificar labores</Text>
        <_Picker
          selectedValue={datas.specifyTasks && recurrency}
          onValueChange={(itemValue: any) => { setDatas({ ...datas, specifyTasks: itemValue }); setSelectedValue(itemValue) }}
          style={[SharedStyles.card, SharedStyles.mb]}
        >
          <_Picker.Item label="No" value={false} />
          <_Picker.Item label="Sí" value={true} />
        </_Picker>
        {
          recurrency && (
            <>
              <View style={styles.section}>
                {checkList.map((check: string, index: number) => (
                  <View key={index} style={styles.wrapCheck}>
                    <Checkbox
                      value={isChecked[index]}
                      style={{...styles.checkbox}}
                      onValueChange={(value) => {
                        console.log(value)
                        setChecked({...isChecked, [index]: value})
                      }}
                      color={isChecked[index] ? '#0BBBEF' : undefined} />
                    <Text style={styles.paragraph}>{check}</Text>
                  </View>
                ))}
              </View>
            </>
          )
        }
        <SearchDirectionMap setData={setDatas} data={datas} />
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={saveService}>
          Continuar
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginBottom: 25
  },
  section: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  wrapCheck: {
    flexBasis: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
    borderRadius: 6,
    border: 0,
    backgroundColor: COLORS.primary
  },
});