import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import useFetch from "use-http";
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { AuthContext } from "../../../contexts/auth-context";
import { SharedStyles } from "../../../styles/shared-styles";

export default function MeetTheTeam() {
    const auth = useContext(AuthContext);
    const { loading, error, data = [] } = useFetch('/order_details/'+auth.getState().user.id, {}, []);
    console.log(data);
    console.log(loading);
    console.log(error);
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Conoce al equipo" />
            <ScrollView
                style={styles.cardsContainer}
                contentContainerStyle={styles.contentContainerCards}
            >
                {
                    loading ? (
                        <Text>Cargando...</Text>
                    ) : error ? (
                        <Text>{error.message}</Text>
                    ) : (
                        data.map(
                            (status: any) => (
                                <ServiceStatusCard key={`status-${status.id}`} status={status} />
                            )
                        )
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        padding: 10,
    },
    contentContainerCards: {
        paddingBottom: 35
    }
});