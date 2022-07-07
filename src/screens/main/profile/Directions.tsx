import React, { useContext, useState,useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import { SharedStyles } from "../../../styles/shared-styles";
import WoldSVG from "../../../resources/img/ui/gps.svg";
import CheckSVG from "../../../resources/img/ui/check.svg";
import useFetch from "use-http";
import { AuthContext } from "../../../contexts/auth-context";

import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import LineORSeparator from "../../../components/ui/LineORSeparator";
import { BASE_URI, COLORS } from "../../../../config";
import { httpClient } from "../../../controllers/http-client";
import { useAuth } from "../../../hooks/use-auth";


export default function Directions() {
    const auth = useContext(AuthContext);
    
    const [state] = useAuth();

    const { loading, error, data = [] } = useFetch('/address/'+state.user.data.id, {}, []);
    const [datas, setDatas] = useState<any>();
    const [direcciones, setDirecciones] = useState<any>();


    const getData = async() => {
        const response = await httpClient.get(`/address/${state.user.data.id}`,{
            headers: {
                'Authorization': `Token token=${state.user.data.token}`
              }
        })

        setDirecciones(response.data);
    }
    
  
   
    
    const addData = async() => {
        try {
            console.log({
                user: state.user,
                address: datas?.address,
                customer_id: state.user.data.id
                
            })
            await httpClient.post(`/address`,{
                address: datas?.address,
                customer_id: state.user.data.id                
            }, {
                headers: {
                    'Authorization': `Token token=${state.user.data.token}`
                  }
            });
    
            const response = await httpClient.get(`/address/${state.user.data.id}`,{
                headers: {
                    'Authorization': `Token token=${state.user.data.token}`
                  }
            })
    
            setDirecciones(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
        
       
    }
   
    useEffect(() => {
        if (!loading) {
             getData()
        }
       
    }, [data])
    
  
   
    
    return (
        <View>
            <ScrollView>
        
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Direcciones" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                {/* <OutlinedInput style={styles.input} placeholder="Ingresa direccion a laborar" value={dataChange} onChangeText={setDataChange}/> */}
                <View>
                    <SearchDirectionMap setData={setDatas} data={datas} />
                </View>
               
                {/* <View style={{ marginTop: 20 }}>
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
                </View> */}
                
                {
                direcciones && direcciones.map((item:any) => {
                    
                    
                    return(
                        <View key={item.id} style={styles.itemAddress} >
                            <Text>{item.address}</Text>    
                        </View> 
                    )
                        
                })
            }
            </ScrollView>
           
            <View style={styles.btnAdd} >
                <Button title="+" onPress={addData}  />
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
        padding: 10
    },
    btnAdd:{
        width:50,
        position:'absolute',
        bottom:10,
        justifyContent:'center',
        right:10,

        
    },
    itemAddress:{
        marginTop:5,
        borderBottomWidth:1,
        borderColor: COLORS.primary,
        marginHorizontal:10,

    }
});
