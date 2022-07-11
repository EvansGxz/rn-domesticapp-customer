/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StackScreenProps } from "@react-navigation/stack";

import Checkbox from 'expo-checkbox';
import { httpClient } from "../../../controllers/http-client";
import { AuthContext } from "../../../contexts/auth-context";
import { SharedStyles } from "../../../styles/shared-styles";

// COMPONENTs
import Button from "../../../components/ui/Button";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import { useCalendar } from "../../../contexts/calendarContext";

import type {HomeStackParamList} from '.';
type Props = StackScreenProps<HomeStackParamList, 'ServiceDetails'>;

export default function ServiceDetails({navigation}: Props) {
    const data = useContext(AuthContext);
    const state = data.getState().user;


    const [isChecked, setChecked] = useState(false);
    const [recurrency, setSelectedValue] = useState(false);
    const [datas, setDatas] = useState({
        ccNit: 'CC',
        food: '1',
        specifyTasks: false
    });
    
    const { category_id, address, start_date, service_time } = useCalendar();
    const saveService = async () => {
        try {
            const formData = {
                category_id: parseInt(category_id),
                employee_id: 10,
                customer_id: parseInt(state.id),
                discount: '0',
                active: true,
                address,
                start_date,
                service_time: service_time,
                workday: "Completo",
                supply_food: "no"
            }
            // console.log('==================>',formData, state);
            const response = await httpClient.post(`/order_details`,formData,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token token=${state.token}`
                }
            });
            console.log({response: response.data})
            navigation.navigate('TodoListo', { params: response.data })
            console.log('<<<<<<<================================>>>>>> PASA <<<<<<<================================>>>>>>')
        } catch (error: any) {
            console.log('<<<<<<<================================>>>>>> ERROR <<<<<<<================================>>>>>>')
            // console.log(error);
            // console.log(error.response);
            console.log(error.response.data);
        }

        // console.log(response);
        
    }
    
    const _Picker: any = Picker;
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="DETALLES" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding]}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Correo de Notificación</Text>
                <OutlinedInput style={styles.input} value={state.email} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de identificación</Text>
                <OutlinedInput style={styles.input} value={state.document_type?.toUpperCase()} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Celular</Text>
                <OutlinedInput style={styles.input} value={state.phone} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>No. De documento</Text>
                <OutlinedInput style={styles.input} value={state.document_id} editable={false} />
                {/*
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>No. De documento</Text>
                <_Picker
                    selectedValue={data.ccNit}
                    onValueChange={(itemValue: any) => setData({ ...data, food: itemValue })}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <_Picker.Item label="Opción 1" value="1" />
                </_Picker>*/}
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Especificar labores</Text>
                <_Picker
                    selectedValue={datas.specifyTasks&&recurrency}
                    onValueChange={(itemValue: any) => {setDatas({ ...datas, specifyTasks: itemValue });  setSelectedValue(itemValue)}}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <_Picker.Item label="No" value={false} />
                    <_Picker.Item label="Sí" value={true} />
                </_Picker>
                {
                    recurrency ? (
                        <>
                            <View style={styles.section}>
                                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#0BBBEF  ' : undefined}/>
                                <Text style={styles.paragraph}>Normal checkbox</Text>
                            </View>
                        </>
                    ) : null
                }
                <SearchDirectionMap setData={setDatas} data={datas} />
                <Button 
                style={SharedStyles.backgroundPrimary}
                onPress={saveService}
                >
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    borderRadius: 6,
    border: 1,
  },
});