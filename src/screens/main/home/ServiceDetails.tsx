import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import Button from "../../../components/ui/Button";
import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import Checkbox from 'expo-checkbox';
import { httpClient } from "../../../controllers/http-client";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigation } from "@react-navigation/native";
import useFetch from "use-http";
import { getCalendarContext } from ".";
import axios from "axios";

export default function ServiceDetails(props:any) {
    const { loading, error, data = {} } = useFetch('/profile', {}, []);
    const navigation = useNavigation<any>();
    const [isChecked, setChecked] = useState(false);
    const [recurrency, setSelectedValue] = useState(false);
    const [datas, setDatas] = useState({
        ccNit: 'CC',
        food: '1',
        specifyTasks: false
    });
    
    const [state] = useAuth();
    const { category_id, address, start_date, service_time, workday } = getCalendarContext();
    const saveService = async () => {
        try {
            const formData = {
                category_id: parseInt(category_id),
                employee_id: 10,
                customer_id: parseInt(state?.user?.data?.id),
                discount: '0',
                active: true,
                address,
                start_date,
                service_time: service_time,
                workday: "Completo",
                supply_food: "no"
            }
            console.log(formData, state?.user?.data);
            const response = await httpClient.post(`/order_details`,formData,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token token=${state?.user?.data.token}`
                }
            });
            console.log({response: response.data})
            navigation.navigate('TodoListo', { params: response.data })
            console.log('<<<<<<<================================>>>>>> PASA <<<<<<<================================>>>>>>')
        } catch (error) {
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
                <OutlinedInput style={styles.input} value={state?.user?.data?.email} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de identificación</Text>
                <OutlinedInput style={styles.input} value={state?.user?.data?.document_type?.toUpperCase()} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Celular</Text>
                <OutlinedInput style={styles.input} value={state?.user?.data?.phone} editable={false} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>No. De documento</Text>
                <OutlinedInput style={styles.input} value={state?.user?.data?.document_id} editable={false} />
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
                    selectedValue={data.specifyTasks&&recurrency}
                    onValueChange={(itemValue: any) => {setDatas({ ...data, specifyTasks: itemValue });  setSelectedValue(itemValue)}}
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