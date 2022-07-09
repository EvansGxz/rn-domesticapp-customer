import React from "react";
import {View, Text, FlatList, KeyboardAvoidingView } from 'react-native';
import useFetch from "use-http";
import NotificationCard from "../../../components/cards/NotificationCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Loader from "../../../components/Loader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function Notifications() {
    const { loading, error, data = [] } = useFetch('/notifications/', {}, []);

    const pdfComponent = () => {
       /*  <WebView
        source={{
          uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl}`,
        }}
      /> */
    }
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