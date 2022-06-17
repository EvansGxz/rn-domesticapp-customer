import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import { SharedStyles } from "../../../styles/shared-styles";
import WoldSVG from '../../../resources/img/ui/gps.svg';
import CheckSVG from '../../../resources/img/ui/check.svg';
import useFetch from "use-http";
import { AuthContext } from "../../../contexts/auth-context";

export default function Directions() {
    const auth = useContext(AuthContext);
    const { loading, error, data = [] } = useFetch('/address/'+auth.getState().user.id, {}, []);
    console.log('Direction', data);
    console.log(loading);
    console.log(error);
    
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Direcciones" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <OutlinedInput style={styles.input} placeholder="Ingresa direccion a laborar" />
                <View style={{ marginTop: 20 }}>
                    {
                        loading ? (
                            <Text>Cargando...</Text>
                        ) : error ? (
                            <Text>{error.message}</Text>
                        ) : (
                            data.map(
                                (direction: any) => (
                                    <MenuOption 
                                        key={`direction-${direction.id}`}
                                        icon={CheckSVG}
                                        size={30}
                                        text={direction.address}
                                    />
                                )
                            )
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10
    }
});