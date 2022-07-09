import React, {useContext} from "react";
import { FlatList, View, Text } from 'react-native';
import { useFetch } from "use-http";
import { SharedStyles } from "../../../styles/shared-styles";
import { AuthContext } from "../../../contexts/auth-context";

// COMPONENTs
import Loader from "../../../components/Loader";
import NotificationCard from "../../../components/cards/NotificationCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

export default function NewsLetter() {
    const {loading, error, data = []} = useFetch(`/newslatters/`,{},[]);
    
    return (
        <View style={{...SharedStyles.mainScreen}}>
            <BackTitledHeader title="Newletter" />
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