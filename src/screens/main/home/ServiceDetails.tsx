import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import Button from "../../../components/ui/Button";
import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import Checkbox from 'expo-checkbox';

export default function ServiceDetails() {
    const [isChecked, setChecked] = useState(false);
    const [recurrency, setSelectedValue] = useState(false);
    const [data, setData] = useState({
        ccNit: 'CC',
        food: '1',
        specifyTasks: false
    });

    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="DETALLES" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={[SharedStyles.mainPadding]}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Correo de Notificación</Text>
                <OutlinedInput style={styles.input} />
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de identificación</Text>
                <Picker
                    selectedValue={data.ccNit}
                    onValueChange={(itemValue) => setData({ ...data, ccNit: itemValue})}
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
                    onValueChange={(itemValue) => {setData({ ...data, specifyTasks: itemValue });  setSelectedValue(itemValue)}}
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
                <SearchDirectionMap />
                <Button style={SharedStyles.backgroundPrimary}>Continuar</Button>
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