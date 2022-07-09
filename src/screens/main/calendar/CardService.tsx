import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../../../config";
import UserImage from "../../../components/user/UserImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from 'moment';
import 'moment/locale/es';

export default function DayCardService(props: {} | any) {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {data} = props;
  const momentLocale = moment(data?.start_date);
  const start_date = `${momentLocale.format('dddd')}, ${momentLocale.format("DD")} de ${momentLocale.format("MMMM")}`;
  
  return (
    <Pressable onPress={() => {
      if(route.name === 'MeetTheTeam') {
        navigation.navigate('MeetTheTeamDetail', {idEmployee: data?.employee.user_id})
      } else {
        // No me deja usar la funcion anidada <Si se puede corregir>..!
        navigation.navigate('MeetTheTeam');
        navigation.navigate('MeetTheTeamDetail', {idEmployee: data?.employee.user_id});
      }
    }
    }>
      <View style={style.card}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={style.cardTitle}>
              {start_date}
            </Text>
          </View>
          <View>
            <Text style={style.textT}>{data.service_time}</Text>
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 10 }}>
              {data?.workday}
            </Text>
          </View>
        </View>
        <View style={style.container}>
          <UserImage size={60} src={data?.employee.image_url} />
          <View style={style.rightSide}>
            <Text style={style.name}>{data?.employee.full_name}</Text>
            <Text numberOfLines={1}>{data?.category.body}</Text>
            <View style={style.statusContainer}>
              <Text style={style.statusText}>3 más</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
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