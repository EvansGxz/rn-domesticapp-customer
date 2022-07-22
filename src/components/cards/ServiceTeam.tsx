import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// COMPONENTs
import { COLORS } from "../../../config";
import UserImage from '../user/UserImage';

interface EmployeDetailProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  onlyService?: boolean;
}

import type { TeamStackParamList } from '../../screens/main/team'
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { HomeStackParamList } from "../../screens/main/home";

type ServiceScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'HomeScreen'>,
  StackNavigationProp<TeamStackParamList, 'MeetTheTeamDetail'>
>;

const ServiceTeam = (props: EmployeDetailProps) => {
  const {item} = props;

  const navigation = useNavigation<ServiceScreenNavigationProp>();
  return (
    <Pressable onPress={() => {
          navigation.navigate(
            'MeetTheTeamDetail', {
              employeeId: item?.employee.user_id,
              id: item?.employee.id})
        }
      }>
      <View style={style.card}>
        <View style={style.container}>
          <UserImage size={60} src={item?.employee.image_url} />
          <View style={style.rightSide}>
            <Text style={style.name}>{item?.employee.full_name}</Text>
            <Text numberOfLines={1}>{item?.employee.biografy}</Text>
            <View style={style.statusContainer}>
              <Text style={style.statusText}>3 más</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightBlue,
    borderBottomColor: "#0BBBEF",
    borderBottomWidth: 1,
    padding: 20,
    marginVertical: 15,
  },
  cardTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  rightSide: {
    flex: 1,
    marginLeft: 10,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  textT: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: "#787B82",
  },
});

export default React.memo(ServiceTeam);

/**
 * Object {
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
}
 */