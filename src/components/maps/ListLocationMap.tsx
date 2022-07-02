import React, { useState, useEffect } from "react";
import { View, StyleSheet,Text , TouchableOpacity} from "react-native";
import { COLORS } from "../../../config";


export default function ListLocationMap(props:any) {
    
    const { ubicaciones,selectLocation } = props;
    

    return (
        <View style={styles.card} >
            {
                ubicaciones.map((item:any) => 
                    <TouchableOpacity 
                    style={styles.item} 
                    key={item.id}
                    onPress={() => selectLocation(item)}
                    >
                        <View  >
                        
                        <Text style={styles.txtItem} >{item.place_name_es}</Text>
                        </View>
                    </TouchableOpacity>
  
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        width:'85%',
        borderColor:COLORS.primary,
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        paddingLeft:5
    },
    item:{
        marginVertical:8
    },
    txtItem:{
        fontSize:12
    }
});
