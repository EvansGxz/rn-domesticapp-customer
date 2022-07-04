import React,{useEffect,useState} from "react";
import { useWindowDimensions } from "react-native";
import { View, StyleSheet, FlatList } from "react-native";
import useFetch from "use-http";
import ServiceTypeButton from "./ServiceTypeButton";



export default function ServiceTypesCatalog() {

    const { loading, error, data = [] } = useFetch('/categories', {}, []);
    const [dataRecort, setDataRecort] = useState<any>({
        data1:null,
        data2:null
    })
    // console.log(data);
    // console.log(loading);
    // console.log(error);
    
    useEffect(() => {
        if (data.length > 0) {
            let medio = Math.round(data.length / 2);
            let fin =  data.length - 1;
        
            setDataRecort({
                data1:data.slice(0, medio),
                data2:data.slice(medio, fin)
            })
            
        }
      
    }, [data])
    
    // console.log(dataRecort.data1);
    
    
    return (
        <View style={styles.servicesCatalogContainer}>
            <FlatList
                data={dataRecort.data1}
                keyExtractor={(item:any) => item?.id.toString()}
                renderItem={({item}) => {
                    // console.log(item);

                    return (
                        <View style={styles.objetivo}>
                           <ServiceTypeButton 
                            key={`category-${item.id}`}
                            id={item.id}
                            image={item.image_url}
                            name={item.category_name}
                        />      
                        </View>
                    )
                    
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled

            // numColumns={3}

            />
             <FlatList
                data={dataRecort.data2}
                keyExtractor={(item:any) => item?.id.toString()}
                renderItem={({item}) => {
                    // console.log(item);

                    return (
                        <View style={styles.objetivo}>
                           <ServiceTypeButton 
                            key={`category-${item.id}`}
                            id={item.id}
                            image={item.image_url}
                            name={item.category_name}
                        />      
                        </View>
                    )
                    
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled

            // numColumns={3}

            />
            {/* {
                data.map(
                    (category: any) => (
                        <ServiceTypeButton 
                            key={`category-${category.id}`}
                            id={category.id}
                            image={category.image_url}
                            name={category.category_name}
                        />    
                    )
                )
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    servicesCatalogContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        // width: '85%',
        justifyContent: 'space-between'
    },
    objetivo: {
        justifyContent:'space-between',
    },
});


// const d = {
//     "body": "Auxiliares y cargadores para bodegas y establecimientos empresariales ",
//     "category_name": "Aux. Bodega Empresas",
//     "id": 39,
//     "image": Object {
//       "name": "image",
//       "record": Object {
//         "body": "Auxiliares y cargadores para bodegas y establecimientos empresariales ",
//         "category_name": "Aux. Bodega Empresas",
//         "created_at": "2022-07-01T21:51:39.501Z",
//         "id": 39,
//         "price_col_complete": "94500.0",
//         "price_col_half": "68500.0",
//         "price_spain": "16.5",
//         "region": "España",
//         "sector_id": 2,
//         "updated_at": "2022-07-01T21:51:39.516Z",
//       },
//     },
//     "image_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBQQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--980bb8c2d3110d31f7e819b73ce9c4aec18f0771/Aux.%20Bodega%20Empresas.png",
//     "price_col_complete": "94500.0",
//     "price_col_half": "68500.0",
//     "price_spain": "16.5",
//     "region": "España",
//     "sector": "Empresarial",
// }
  
