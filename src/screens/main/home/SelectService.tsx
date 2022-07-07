import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../components/ui/Button";
import LineORSeparator from "../../../components/ui/LineORSeparator";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getCalendarContext } from ".";

export default function SelectService() {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const navigation = useNavigation<any>();
    const route = useRoute();
    const _Picker: any = Picker;
    const { setworkday } = getCalendarContext();
    useFocusEffect( useCallback( () => {
        setworkday("Jornada Completa");
        setSelectedValue("Jornada Completa");
    }, []) )
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="ELIGE TU SERVICIO" />
            <View style={[{ paddingHorizontal: 35, paddingTop: 20 }, SharedStyles.fill]}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Tipo de jornada *</Text>
                <_Picker 
                    selectedValue={selectedValue}
                    onValueChange={(itemValue: any) => {
                        setworkday(itemValue)
                        setSelectedValue(itemValue)
                    }}
                    style={[SharedStyles.card]}
                >
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
