import React from "react";
import { FlatList, View, Text } from 'react-native';
import NotificationCard from "../../../components/cards/NotificationCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { useFetch } from "use-http";
import Loader from "../../../components/Loader";

export default function NewsLetter() {
    const {loading, error, data = []} = useFetch(`/notifications/`,{},[]);
    return (
        <View style={{...SharedStyles.mainScreen}}>
            <BackTitledHeader title="Notificaciones" />
            {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
                <FlatList
                    data={data}
                    initialNumToRender={6}
                    maxToRenderPerBatch={6}
                    updateCellsBatchingPeriod={6}
                    keyExtractor={(key: any) => key.id}
                    renderItem={({item}) => (<NotificationCard color="primary" notification={item} />)}
                />
            )}
        </View>
    );
}