/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import useFetch from 'use-http';

// COMPONENTs
import MenuOption from '../../../components/ui/MenuOption';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import SearchDirectionMap from '../../../components/maps/SearchDirectionMap';

// UTILs
import { COLORS } from '../../../../config';
import CheckSVG from '../../../resources/img/ui/check.svg';
import { SharedStyles } from '../../../styles/shared-styles';
import { httpClient } from '../../../controllers/http-client';
import { useAuth } from '../../../hooks/use-auth';

export default function Directions() {
  const {state} = useAuth();
  const user = state.user;

  const { loading, error, data = [] } = useFetch(`/address/${user.id}`, {}, []);
  const [datas, setDatas] = useState<any>();
  const [direcciones, setDirecciones] = useState<any>();

  // const getData = async() => {
  //     const response = await httpClient.get(`/address/${state.user.id}`,{
  //         headers: {
  //             'Authorization': `Token token=${state.user.token}`
  //         }
  //     });
  //     setDirecciones(response.data);
  // }

  const addData = async () => {
    try {
      console.log({
        user,
        address: datas?.address,
        customer_id: user.id,
      });
      await httpClient.post(
        `/address`,
        {
          address: datas?.address,
          customer_id: user.id,
        },
        {
          headers: { Authorization: `Token token=${user.token}` },
        },
      );

      const response = await httpClient.get(`/address/${user.id}`, {
        headers: {
          Authorization: `Token token=${user.token}`,
        },
      });

      setDirecciones(response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={SharedStyles.mainScreen}>
          <BackTitledHeader title="Direcciones" />
          <ScrollView
            style={SharedStyles.fill}
            contentContainerStyle={SharedStyles.mainPadding}>
            {/* <OutlinedInput style={styles.input} placeholder="Ingresa direccion a laborar" value={dataChange} onChangeText={setDataChange}/> */}
            <View>
              <SearchDirectionMap setData={setDatas} data={datas} />
            </View>
            {direcciones &&
              direcciones.map((item: any) => (
                <View key={item.id} style={styles.itemAddress}>
                  <Text>{item.address}</Text>
                </View>
              ))}
          </ScrollView>

          <View style={styles.btnAdd}>
            <Button title="+" onPress={addData} />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <Text>Cargando...</Text>
          ) : error ? (
            <Text>{error.message}</Text>
          ) : (
            data.map((direction: any) => (
              <MenuOption
                key={`direction-${direction.id}`}
                icon={CheckSVG}
                size={30}
                text={direction.address}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
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
