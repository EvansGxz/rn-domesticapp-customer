import React, { useState } from "react";
import { View, Text } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { Picker } from '@react-native-picker/picker';
import Button from "../../../components/ui/Button";
import LineORSeparator from "../../../components/ui/LineORSeparator";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SelectService() {
    const [selectedValue, setSelectedValue] = useState('1');
    const navigation = useNavigation<any>();
    const route = useRoute();
    
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="ELIGE TU SERVICIO" />
            <View style={[{ paddingHorizontal: 35, paddingTop: 20 }, SharedStyles.fill]}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de jornada *</Text>
                <Picker 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={[SharedStyles.card]}
                >
                    <Picker.Item label="Jornada Completa" value="1" />
                    <Picker.Item label="Media Jornada" value="2" />
                </Picker>
            </View>
            <View style={[SharedStyles.mainPadding, SharedStyles.centerContent]}>
                <Button style={SharedStyles.backgroundPrimary}>
                    Seleccionar empleado
                </Button>
                <LineORSeparator />
                <Button 
                    style={SharedStyles.backgroundPrimary}
                    onPress={
                        () => navigation.navigate(
                            'ServiceCalendar', 
                            { ...route.params, workingDayType: selectedValue  }
                        )
                    }
                >
                    Continuar
                </Button>
            </View>
        </View>
    );
}
