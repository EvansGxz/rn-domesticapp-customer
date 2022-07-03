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
    // console.log(props?.route?.params);
    

    // console.log(data);
    
    
    const saveService = async () => {
        const {working,recurrency,recurrencyData,workingDayType,workingHour} = props?.route?.params;
  
        console.log({
            ...datas,
            working,recurrency,recurrencyData,workingDayType,workingHour
        });
        
        // console.log(working.date[0]);
                    

        const response = await httpClient.post(`/order_details/`,{
            body: {
                address: "calle 43",
                start_date: "2022-06-27",
                service_time: "12:00",
                discount: "7",
                workday: "Media",
                supply_food: "No",
                category_id: 1,
                employee_id: 3,
                customer_id: 2
            }
        });

        // console.log(response);
        
    }
    
    
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="DETALLES" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding]}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Correo de Notificación</Text>
                <OutlinedInput style={styles.input} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de identificación</Text>
                <Picker
                    selectedValue={data.ccNit}
                    onValueChange={(itemValue) => setDatas({ ...data, ccNit: itemValue})}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <Picker.Item label="CC" value="CC" />
                    <Picker.Item label="NIT" value="NIT" />
                </Picker>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Celular</Text>
                <OutlinedInput style={styles.input} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>No. De documento</Text>
                <OutlinedInput style={styles.input} />
                {/*
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>No. De documento</Text>
                <Picker
                    selectedValue={data.ccNit}
                    onValueChange={(itemValue) => setData({ ...data, food: itemValue })}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <Picker.Item label="Opción 1" value="1" />
                </Picker>*/}
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Especificar labores</Text>
                <Picker
                    selectedValue={data.specifyTasks&&recurrency}
                    onValueChange={(itemValue) => {setDatas({ ...data, specifyTasks: itemValue });  setSelectedValue(itemValue)}}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <Picker.Item label="No" value={false} />
                    <Picker.Item label="Sí" value={true} />
                </Picker>
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