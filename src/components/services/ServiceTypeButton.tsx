import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useCalendar } from '../../contexts/calendarContext';
import { ServiceType } from '../../interfaces/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import type { HomeStackParamList } from '../../screens/main/home';

export interface ServiceTypeButtonProps { category: ServiceType }
const ServiceTypeButton = (props: ServiceTypeButtonProps) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList, 'SelectService'>>();
  const { setcategory_id } = useCalendar();
  const { id, category_name, image_url } = props.category;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setcategory_id(id.toString());
        navigation.navigate('SelectService');
      }}>
      <Image style={styles.serviceImg} source={{ uri: image_url }} />
      <Text style={styles.serviceText}>{category_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    width: 90,
  },
  serviceImg: {
    width: 60,
    height: 60,
  },
  serviceText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    fontFamily: "Poppins_400Regular",
  },
});

export default React.memo(ServiceTypeButton);