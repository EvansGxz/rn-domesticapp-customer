import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";
import ServiceDetailCard from "../../../components/cards/ServiceDetailCard";
import UserImage from "../../../components/user/UserImage";

export default function CalendarScreen(props: any) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isService, setIsService] = useState(true);

  const toggleModal = () => setIsModalOpened(!isModalOpened);
  const status = {
    employee: {
      full_name: "Maria del refugio",
      active: "Activo",
      tipe_service: "Servicio Recurrente",
      list_service: {
        service1: "Lavado de Ropa",
        service2: "Planchado de Ropa",
        service3: "Doblado de Ropa",
        service4: "Limpieza de cocina",
        service5: "Limpieza de Automóvil",
        service6: "Preparación de Alimentos",
      },
      Direction: "Calle 15 #13-57, barbosa, Antioquia",
    },
  };
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Mi Calendario" />
      <ScrollView
        style={SharedStyles.fill}
        contentContainerStyle={SharedStyles.mainPadding}
      >
        <Text style={SharedStyles.p}>
          Recuerda que los reportes deben de realizarse dentro de las primeras
          48 horas.
        </Text>
        <Text style={SharedStyles.h2}>
          Seleccionar fechas en el calendario:
        </Text>
        <Calendar />
        {/* Card */}
        {/* <DayCard /> */}
        {isService ? (
          <>
            <DayCardService />
            <View
              style={[SharedStyles.centerContent, SharedStyles.mainPadding]}
            >
              <Button
                style={SharedStyles.backgroundPrimary}
                onPress={toggleModal}
              >
                Ver Detalles del Servicio
              </Button>
            </View>
          </>
        ) : null}
      </ScrollView>
      {/*  <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
        <Button style={SharedStyles.backgroundPrimary}>
          Ir a Proximo Servicio
        </Button>
      </View> */}
      <Modal animationType="slide" transparent={true} visible={isModalOpened}>
        <View
          style={{
            backgroundColor: "#909090",
            opacity: 0.79,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={[style.cardModal, { width: "90%" }]}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={style.cardTitle}>
                  Jueves, 12 de Mayo
                </Text>
              </View>
              <View>
                <Text style={style.textT}>11:00-18:00hr</Text>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 10,
                    color: COLORS.primary,
                  }}
                >
                  Jornada Completa
                </Text>
              </View>
            </View>
            <View style={style.container}>
              <UserImage size={60} sourceImage />
              <View style={style.rightSide}>
                <Text style={style.name}>{status.employee.full_name}</Text>
                <Text numberOfLines={1} style={[style.textT2]}>
                  {status.employee.tipe_service}
                </Text>
              </View>
            </View>
            <View style={style.statusContainerModal}>
              <View
                style={{
                  borderRadius: 50,
                  width: 4,
                  height: 4,
                  backgroundColor: COLORS.primary,
                  marginRight: 7,
                }}
              />
              <Text style={style.statusTextModal}>
                {status.employee.tipe_service}
              </Text>
            </View>
            <View style={style.containerDirection}>
              <Text style={[style.name, { fontSize: 12 }]}>Dirección:</Text>
              <Text style={[style.name, { fontSize: 12, fontWeight: "400" }]}>
                {status.employee.Direction}
              </Text>
            </View>
          </View>

          {/* Buttons Modal */}

          <View
            style={[
              SharedStyles.centerContent,
              SharedStyles.mainPadding,
              { width: "90%" },
            ]}
          >
            <Button style={[SharedStyles.backgroundPrimary]}>
              Ver Dirección en el Mapa
            </Button>
          </View>
          <View
            style={[
              SharedStyles.centerContent,
              SharedStyles.mainPadding,
              { width: "90%" },
            ]}
          >
            <Button
              style={[SharedStyles.backgroundPrimary]}
              onPress={toggleModal}
            >
              Regresar a Calendario
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* export function DayCard() {
  return (
    <View style={style.card}>
      <Text style={style.cardTitle}>Jueves, 11 de Mayo</Text>
      <Text style={style.text}>No se han añadido servicios</Text>
    </View>
  );
} */

export function DayCardService(props: any) {
  const status = {
    employee: {
      full_name: "Maria del refugio",
      active: "Activo",
    },
  };
  return (
    <View style={style.card}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={style.cardTitle}>
            Jueves, 12 de Mayo
          </Text>
        </View>
        <View>
          <Text style={style.textT}>11:00-18:00hr</Text>
          <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 10 }}>
            Jornada Completa
          </Text>
        </View>
      </View>
      <View style={style.container}>
        <UserImage size={60} sourceImage />
        <View style={style.rightSide}>
          <Text style={style.name}>{status.employee.full_name}</Text>
          <Text numberOfLines={1}>Limpieza de ropa, Doblado de Ropa</Text>
          <View style={style.statusContainer}>
            <Text style={style.statusText}> {3} más</Text>
          </View>
        </View>
      </View>
    </View>
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
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    color: "#787B82",
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
  statusContainerModal: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  containerModalDirection: {
    backgroundColor: "#0000",
    borderRadius: 5,
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
