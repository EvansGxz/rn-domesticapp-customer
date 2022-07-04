import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { Picker } from "@react-native-picker/picker";
import Button from "../../../components/ui/Button";
import DateOutlinedButton from "../../../components/ui/DateOutlinedInput";

export default function ServiceRecurrentSelection() {
    const [recurrency, setSelectedValue] = useState(false);
    const [recurrencyData, setRecurrencyData] = useState({
        date: ''
    });
    const navigation = useNavigation<any>();
    const route = useRoute();
    
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="RECURRENCIA" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={{ paddingHorizontal: 35, paddingTop: 20 }}>
                <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Repetir cita</Text>
                <Picker
                    selectedValue={recurrency}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={[SharedStyles.card, SharedStyles.mb]}
                >
                    <Picker.Item label="No" value={false} />
                    <Picker.Item label="Sí" value={true} />
                </Picker>
                {
                    recurrency ? (
                        <>
                            <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Frecuencia</Text>
                            <Picker
                                selectedValue={recurrency}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                style={[SharedStyles.card, SharedStyles.mb]}
                            >
                                <Picker.Item label="Diario" value="0" />
                                <Picker.Item label="Semanal" value="1" />
                                <Picker.Item label="Quincenal" value="2" />
                                <Picker.Item label="Mensual" value="3" />
                            </Picker>
                            <Text style={[SharedStyles.h3, { marginBottom: 10}]}>Fecha limite</Text>
                            <DateOutlinedButton
                                editable={false}
                                onChangeText={(date) => setRecurrencyData({ ...recurrencyData, date })} 
                                value={recurrencyData.date}
                            />
                        </>
                    ) : null
                }
            </ScrollView>
            <View style={[SharedStyles.mainPadding, SharedStyles.centerContent]}>
                <Button 
                    style={SharedStyles.backgroundPrimary}
                    onPress={
                        () => navigation.navigate(
                            'ServiceDetails', 
                            { ...route.params, recurrency, recurrencyData }
                        )
                    }
                >
                    Continuar
                </Button>
            </View>
        </View>
    );
}