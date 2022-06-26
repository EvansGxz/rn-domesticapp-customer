import React, { useContext } from "react";
import { ScrollView, View, Text } from 'react-native';
import useFetch from "use-http";
import NotificationCard from "../../../components/cards/NotificationCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { AuthContext } from "../../../contexts/auth-context";
import { SharedStyles } from "../../../styles/shared-styles";
import { WebView } from 'react-native-webview';

export default function Notifications() {
    const auth = useContext(AuthContext);
    const { loading, error, data = [] } = useFetch('/notifications/'+auth.getState().user.id, {}, []);
    console.log(data);
    console.log(loading);
    console.log(error);

    const pdfComponent = () => {
       /*  <WebView
        source={{
          uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl}`,
        }}
      /> */
    }
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Notificaciones" />
            <ScrollView style={SharedStyles.fill}>
                {
                    loading ? (
                        <Text>Cargando...</Text>
                    ) : error ? (
                        <Text>{error.message}</Text>
                    ) : (
                        data.map(
                            (notification: any) => (
                                <NotificationCard key={`notification-${notification.id}`} color="primary" notification={notification} />
                            )
                        )
                    )
                }
            </ScrollView>
        </View>
    );
}