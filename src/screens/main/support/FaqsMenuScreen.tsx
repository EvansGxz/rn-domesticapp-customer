import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SharedStyles } from "../../../styles/shared-styles";

// COMPOONENTs
import MenuOption from "../../../components/ui/MenuOption";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

// SVGs
import BarsSVG from '../../../resources/img/support-icons/bars.svg';
import EmployeeSVG from '../../../resources/img/support-icons/employee.svg';
import ContractSVG from '../../../resources/img/menu/contract.svg';
import ServicesSVG from '../../../resources/img/support-icons/services.svg';
import PaymentsSVG from '../../../resources/img/support-icons/payments.svg';
import CovidSVG from '../../../resources/img/support-icons/covid.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FaqsMenuScreen({navigation}: any) {
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
                    onPress={() => navigation.navigate('FaqsDetail', { id: 1 })}
                />
                <MenuOption 
                    size={58} 
                    icon={ContractSVG} 
                    text="Mi cuenta" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 2 })}
                />
                <MenuOption 
                    size={58} 
                    icon={EmployeeSVG} 
                    text="Empleados" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 3 })}
                />
                <MenuOption 
                    size={58} 
                    icon={PaymentsSVG} 
                    text="Pagos" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 4 })}
                />
                <MenuOption 
                    size={58} 
                    icon={CovidSVG} 
                    text="Con la COVID-19" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 5 })}
                />
                <MenuOption 
                    size={58} 
                    icon={BarsSVG} 
                    text="Mi Dotación" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 6 })}
                />
                <MenuOption 
                    size={58} 
                    icon={BarsSVG} 
                    text="Beneficios" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 7 })}
                />
                <MenuOption 
                    size={58} 
                    icon={BarsSVG} 
                    text="Devoluciones" 
                    onPress={() => navigation.navigate('FaqsDetail', { id: 8 })}
                />
            </ScrollView>
        </View>
    );
}