import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

// COMPONENTs
import DayCardService from './DayCardService';
import Button from '../ui/Button';
import { SharedStyles } from "../../styles/shared-styles";
import { COLORS } from "../../../config";
import UserImage from '../user/UserImage';
import moment from 'moment';
import 'moment/locale/es';

interface EmployeDetailProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  onlyService?: boolean;
}

const ServiceCard = (props: EmployeDetailProps) => {
  const {item} = props;
  const [isModalOpened, setIsModalOpened] = React.useState(false);
  const toggleModal = () => setIsModalOpened(!isModalOpened);
  const momentLocale = moment(item?.start_date);
  const start_date = `${momentLocale.format('dddd')}, ${momentLocale.format("DD")} de ${momentLocale.
    format("MMMM")}`;

  return (
    <>
      <DayCardService onlyService data={item} />

      {!props.onlyService && (
        <>
          <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
            <Button
              style={SharedStyles.backgroundPrimary}
              onPress={toggleModal}>
              Ver Detalles del Servicio
            </Button>
          </View>
          <Modal animationType="slide" transparent={true} visible={isModalOpened}>
            <View
              style={{
                backgroundColor: "#909090",
                opacity: 0.79,
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <View style={[style.cardModal, { width: "90%" }]}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={style.cardTitle}>
                      {start_date}
                    </Text>
                  </View>
                  <View>
                    <Text style={style.textT}>{item.service_time}</Text>
                    <Text
                      style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 10,
                        color: COLORS.primary,
                      }}>
                      {item.workday}
                    </Text>
                  </View>
                </View>
                <View style={style.container}>
                  <UserImage size={60} src={item?.employee.image_url} />
                  <View style={style.rightSide}>
                    <Text style={style.name}>{item?.employee.full_name}</Text>
                    <Text numberOfLines={1} style={[style.textT2]}>
                      {item.employee.tipe_service}
                    </Text>
                  </View>
                </View>
                <View style={style.statusContainerModal}>
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      marginRight: 7,
                      borderRadius: 50,
                      backgroundColor: COLORS.primary,
                    }}
                  />
                  <Text style={style.statusTextModal}>
                    {item.category.category_name}
                  </Text>
                </View>
                <View style={style.containerDirection}>
                  <Text style={[style.name, { fontSize: 12 }]}>Dirección:</Text>
                  <Text style={[style.name, { fontSize: 12, fontWeight: "400" }]}>
                    {item?.employee.region}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  SharedStyles.centerContent,
                  SharedStyles.mainPadding,
                  { width: "90%" },
                ]}>
                <Button
                  style={[SharedStyles.backgroundPrimary]}
                  onPress={toggleModal}>
                  Regresar a Calendario
                </Button>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  )
}

const style = StyleSheet.create({
  cardModal: {
    height: "40%",
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    marginVertical: 15,
    borderRadius: 5,
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
  statusContainerModal: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
  },
  statusTextModal: {
    color: "#3D4451",
    fontSize: 13,
    fontWeight: "600",
  },
  textT: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: "#787B82",
  },
  textT2: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#787B82",
  },
  containerDirection: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default React.memo(ServiceCard);