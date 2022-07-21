import * as Location from "expo-location";
import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { COLORS } from '../../../../config';

// COMPONENTs
import Button from '../../../components/ui/Button';
import HomeHero from '../../../components/ui/HomeHero';
import UserHeader from '../../../components/headers/UserHeader';
import ServiceTypesCatalog from '../../../components/services/ServiceTypesCatalog';
import type { RootTabParamList } from '../BottomNavigation';
import type { StackScreenProps } from '@react-navigation/stack';

import { useAuth } from '../../../hooks/use-auth';
import ModalUI from '../../../components/ui/ModalUI';
import ModalProfile from './ModalProfile';
import Alert from '../../../controllers/Alert';
import { PayloadActionKind } from "../../../contexts/authReducer";

type Props = StackScreenProps<RootTabParamList, 'Team'>;

export default function Home({ navigation }: Props) {
  const { state, dispatch } = useAuth();
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);

  useLayoutEffect(() => {

    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert({msg: 'Permission to access location was denied', type: 'DANGER'});
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      dispatch({type: PayloadActionKind.LOCATION, payload: {location: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      }}});
    })();

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
