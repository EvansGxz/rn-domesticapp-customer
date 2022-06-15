import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Text } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import { SharedStyles } from "../../../styles/shared-styles";
import BarsSVG from '../../../resources/img/support-icons/bars.svg';
import EmployeeSVG from '../../../resources/img/support-icons/employee.svg';
import ContractSVG from '../../../resources/img/menu/contract.svg';
import ServicesSVG from '../../../resources/img/support-icons/services.svg';
import PaymentsSVG from '../../../resources/img/support-icons/payments.svg';
import CovidSVG from '../../../resources/img/support-icons/covid.svg';

export default function FaqsMenuScreen() {
    const navigation = useNavigation<any>();
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Preguntas Frecuentes" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={SharedStyles.p}>
                    Aquí encontrarás una serie de preguntas frecuentes, esperamos te sean de ayuda o comunicate con el
                    Servicio de Soporte y Ayuda.
                </Text>
                <Text style={SharedStyles.h2}>Tengo dudas con:</Text>
                <MenuOption 
                    size={58} 
                    icon={ServicesSVG} 
                    text="Mis Servicios" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
                <MenuOption 
                    size={58} 
                    icon={ContractSVG} 
                    text="Mi cuenta" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
                <MenuOption 
                    size={58} 
                    icon={EmployeeSVG} 
                    text="Empleados" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
                <MenuOption 
                    size={58} 
                    icon={PaymentsSVG} 
                    text="Pagos" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
                <MenuOption 
                    size={58} 
                    icon={CovidSVG} 
                    text="Con la COVID-19" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
                <MenuOption 
                    size={58} 
                    icon={BarsSVG} 
                    text="Con Mi Dotación" 
                    onPress={() => navigation.navigate('FaqsDetail')}
                />
            </ScrollView>
        </View>
    );
}