import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { WebView } from 'react-native-webview';

import type { HomeStackParamList } from '.';
type Props = StackScreenProps<HomeStackParamList, 'TodoListo'>;

export default function TodoListo({ route }: Props) {
  const { params } = route.params;
  const price = Math.round(params.category.price_col_complete) + '00';
  const { country, region, email, phone, document_id, full_name, document_type  } = params.customer;

  const slug = `?price=${price}&phone=${phone}&country=${country}&region=${region}&email=${email}&document_id=${document_id}&full_name=${full_name}&document_type=${document_type.toUpperCase()}`;
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="TODO LISTO" />
      <WebView
        source={{ uri:
          `domesticapp.netlify.app/${slug}`
        }}
      />
    </View>
  );
}

/**
 * Object {
  "active": true,
  "address": "",
  "category": Object {
    "body": "Cuidado y asistencia infantil en el hogar",
    "category_name": "Niñera",
    "id": 26,
    "image": Object {
      "name": "image",
      "record": Object {
        "body": "Cuidado y asistencia infantil en el hogar",
        "category_name": "Niñera",
        "created_at": "2022-07-01T21:26:48.322Z",
        "id": 26,
        "price_col_complete": "94500.0",
        "price_col_half": "68500.0",
        "price_spain": "16.5",
        "region": "Colombia",
        "sector_id": 1,
        "updated_at": "2022-07-01T21:26:48.336Z",
      },
    },
    "image_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--819931bf4ccb7375d106bea62bb13d71c418b8ce/Ni%C3%B1eras.png",
    "price_col_complete": "94500.0",
    "price_col_half": "68500.0",
    "price_spain": "16.5",
    "region": "Colombia",
    "sector": "Hogares",
  },
  "customer": Object {
    "birth_date": "1998-10-26",
    "client_type": "Persona",
    "cod_refer": "null",
    "country": "Colombia",
    "cover": Object {
      "name": "cover",
      "record": Object {
        "active": true,
        "birth_date": "1998-10-26",
        "boolean": true,
        "client_type": "Persona",
        "cod_refer": "null",
        "country": "Colombia",
        "created_at": "2022-07-14T17:17:39.779Z",
        "document_id": "27795845",
        "document_type": "cc",
        "encargado": null,
        "full_name": "Dominyel Rivera (BotLacrita)",
        "id": 59,
        "new": true,
        "region": "null",
        "updated_at": "2022-07-20T14:26:32.572Z",
        "user_id": 82,
      },
    },
    "created_at": "2022-07-14T17:17:39.779Z",
    "document_id": "27795845",
    "document_type": "cc",
    "email": "botlacrita617@gmail.com",
    "encargado": null,
    "full_name": "Dominyel Rivera (BotLacrita)",
    "id": 59,
    "image_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3NCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--83e71ef20f29cbfe48770fae283a068efde72d9e/coverimage.jpg",
    "lada": "+58",
    "new": true,
    "phone": "3027932484",
    "region": "null",
    "social_id": "109459663112496973996",
    "token": "TvtbtR26CjoExdsfaKEJ7hcR",
    "user_id": 82,
    "user_type": "customer",
  },
  "discount": "0",
  "employee": Object {
    "biografy": "Hola soy un empleado muy formal",
    "birth_date": "1988-06-16",
    "contact": null,
    "contrato": Object {
      "name": "contrato",
      "record": Object {
        "active": true,
        "biografy": "Hola soy un empleado muy formal",
        "birth_date": "1988-06-16",
        "boolean": true,
        "contact": null,
        "country": "Colombia",
        "created_at": "2022-07-02T16:38:26.598Z",
        "document_id": "123456",
        "document_type": null,
        "experience": "3",
        "full_name": "Sebas empleado",
        "id": 10,
        "new": true,
        "region": "Calle 9 Sur # 79C - 151",
        "updated_at": "2022-07-02T16:38:28.388Z",
        "user_id": 27,
      },
    },
    "contrato_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--47f8ffa86e5467c70e2ee830d722d21330d08731/DATA%20EMPLEADOS%20-%20DOMESTICAPP%202022.pdf",
    "country": "Colombia",
    "cover": Object {
      "name": "cover",
      "record": Object {
        "active": true,
        "biografy": "Hola soy un empleado muy formal",
        "birth_date": "1988-06-16",
        "boolean": true,
        "contact": null,
        "country": "Colombia",
        "created_at": "2022-07-02T16:38:26.598Z",
        "document_id": "123456",
        "document_type": null,
        "experience": "3",
        "full_name": "Sebas empleado",
        "id": 10,
        "new": true,
        "region": "Calle 9 Sur # 79C - 151",
        "updated_at": "2022-07-02T16:38:28.388Z",
        "user_id": 27,
      },
    },
    "created_at": "2022-07-02T16:38:26.598Z",
    "document_id": "123456",
    "document_type": null,
    "email": "sebasprueba@gmail.com",
    "experience": "3",
    "full_name": "Sebas empleado",
    "id": 10,
    "image_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40637771c0ee748c74919e69c0def65da79fddb1/EMPLEADA%20DOMESTICAPP.png",
    "lada": "+57",
    "new": true,
    "phone": "3024480728",
    "region": "Calle 9 Sur # 79C - 151",
    "token": "Hgad8S6t3AsKgR2LYvCKwCx6",
    "user_id": 27,
    "user_type": "employee",
  },
  "finish_date": null,
  "hours": null,
  "id": 87,
  "service_time": "09:32 am",
  "start_date": "2022-07-20",
  "supply_food": "no",
  "workday": "Jornada Completa",
}
 */
