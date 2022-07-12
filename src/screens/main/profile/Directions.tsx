/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import useFetch from 'use-http';

// COMPONENTs
import Loader from '../../../components/Loader';
import MenuOption from '../../../components/ui/MenuOption';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import SearchDirectionMap from '../../../components/maps/SearchDirectionMap';

// UTILs
import { COLORS } from '../../../../config';
import CheckSVG from '../../../resources/img/ui/check.svg';
import { SharedStyles } from '../../../styles/shared-styles';
import { httpClient } from '../../../controllers/http-client';
import { useAuth } from '../../../hooks/use-auth';
import { PayloadActionKind } from '../../../contexts/authReducer';

export default function Directions() {
  const {state, dispatch} = useAuth();
  const user = state.user;
  const { loading, error, data = [] } = useFetch(`/address/${user.id}`, {}, []);
  const [datas, setDatas] = useState<any>();
  const [direcciones, setDirecciones] = useState<any[]>([]);

  const addData = async () => {
    dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: true}});
    try {
      await httpClient.post(`/address`,
        {address: datas?.address, customer_id: user.id},
        {headers: { Authorization: `Token token=${user.token}` }}
      );

      const response = await httpClient.get(`/address/${user.id}`, {
        headers: {Authorization: `Token token=${user.token}`}
      });
      setDirecciones(response.data);
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
    } catch (error: any) {
      console.log('===============NO PASA=======================')
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setTimeout(() => setDirecciones(data), 1000);
  }, [data]);

  return (
    <>
      <BackTitledHeader title="Direcciones" />
      <ScrollView>
        <View style={SharedStyles.mainScreen}>
          <ScrollView
            style={SharedStyles.fill}
            contentContainerStyle={SharedStyles.mainPadding}>
            <SearchDirectionMap setData={setDatas} data={datas} />
            {/* {direcciones.map((item: any) => (
              <View key={item.id} style={styles.itemAddress}>
                <Text>{item.address}</Text>
              </View>
            ))} */}
          </ScrollView>

          <View style={styles.btnAdd}>
            <Button title="+" onPress={addData} />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {loading ? (<Loader/>) : error ? (<Text>{error.message}</Text>) : (
            direcciones.map((direction: any) => (
              <MenuOption
                key={`direction-${direction.id}`}
                size={30}
                icon={CheckSVG}
                text={direction.address}
              />
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
  btnAdd: {
    width: 50,
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    right: 10,
  },
  itemAddress: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 10,
  },
});
