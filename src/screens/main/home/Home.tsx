import React, { useLayoutEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { COLORS } from "../../../../config";

// COMPONENTs
import Button from "../../../components/ui/Button";
import HomeHero from "../../../components/ui/HomeHero";
import UserHeader from "../../../components/headers/UserHeader";
import ServiceTypesCatalog from "../../../components/services/ServiceTypesCatalog";
import type { RootTabParamList } from '../BottomNavigation';
import type { StackScreenProps } from "@react-navigation/stack";

import { useAuth } from "../../../hooks/use-auth";
import ModalUI from "../../../components/ui/ModalUI";
import ModalProfile from "./ModalProfile";

type Props = StackScreenProps<RootTabParamList, 'Team'>;

export default function Home({ navigation }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state } = useAuth();
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

  useLayoutEffect(() => {
    if (state.user.client_type === null) {
      setIsModalOpened(true);
    }
  }, []);

  return (
    <>
      {state.user?.client_type && <UserHeader />}
      <ScrollView style={styles.homeContainer}>
        {state.user?.client_type ? (
          <>
            <HomeHero />
            <View style={styles.centerCategories}>
              <ServiceTypesCatalog />
              <Button
                style={styles.button}
                onPress={() => navigation.navigate('Team')}>
                Conoce al Equipo
              </Button>
            </View>
          </>
        ) : (
          <ModalUI isOpen={isModalOpened}>
            <View style={[styles.cardModal, { width: "90%" }]}>
              <ModalProfile setIsOpen={setIsModalOpened} />
            </View>
          </ModalUI>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  cardModal: {
    padding: 20,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: COLORS.lightBlue,
  },
  centerCategories: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  button: {
    width: "90%",
    padding: 20,
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },
});
