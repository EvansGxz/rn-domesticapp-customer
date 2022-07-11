import React from "react";
import { ScrollView, View, Text } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";

export default function TermsAndConditions() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Terminos y Condiciones" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={SharedStyles.h2}>1.- CONDICIONES GENERALES DE USO</Text>
                <Text style={[SharedStyles.p, { textAlign: 'justify' }]}>
                El presente documento tiene por objeto establecer las Condiciones Generales de Uso de las aplicaciones móviles y el servicio web a titularidad de DOMESTICAPP S.A.S. (en adelante DOMESTICAPP) con domicilio social en Medellín Colombia, dirección Calle 9 sur #79C-151 e inscrito en la Cámara de Comercio de Medellín.
                {'\n\n'}
                DOMESTICAPP se reserva el derecho a modificar las presentes Condiciones de Uso con el objeto de adecuarlas a la legislación vigente aplicable en cada momento. Las presentes Condiciones de Uso no excluyen la posibilidad de que determinados Servicios de las aplicaciones, por sus características particulares, sean sometidos, además de a las Condiciones Generales de Uso, a sus propias condiciones particulares de uso (en adelante las Condiciones Particulares).
                {'\n\n'}
                La Empresa podrá, en cualquier momento y sin necesidad de previo aviso,
                realizar cambios y actualizaciones de las presentes Condiciones de Uso y de la
                Política de Privacidad...
                </Text>
            </ScrollView>
            <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
                <Button style={SharedStyles.backgroundPrimary}>Descargar documento</Button>
            </View>
        </View>
    );
}
