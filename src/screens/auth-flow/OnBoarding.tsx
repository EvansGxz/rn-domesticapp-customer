/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Onboarding1SVG from '../../resources/img/ui/onboarding-1.svg';
import Onboarding2SVG from '../../resources/img/ui/onboarding-2.svg';
import Onboarding3SVG from '../../resources/img/ui/onboarding-3.svg';
import { SharedStyles } from '../../styles/shared-styles';
import { useNavigation } from '@react-navigation/core';
import Button from '../../components/ui/Button';
import Footer from '../../components/ui/Footer';

export default function OnBoarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const pager = useRef<PagerView>();
  const navigation = useNavigation<any>();

  const next = () => pager.current?.setPage(currentPage + 1);

  return (
    <SafeAreaView style={SharedStyles.mainScreen}>
      <PagerView
        initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} ref={pager as any} style={SharedStyles.fill}>
        <View style={style.page} key="1">
          <View style={style.content}>
            <Text style={[SharedStyles.h2, { fontSize: 24 }]}>Bienvenido a Domesticapp</Text>
            <Onboarding1SVG style={style.onboardingImage} />
            <Text style={[SharedStyles.p, { textAlign: 'center' }]}>
              Creamos un paso a paso para ayudarte a entender
              qué hacer para recibir tu primer empleo y hacer un mejor
              uso de la aplicación.
            </Text>
            <Button
              style={[SharedStyles.backgroundPrimary, style.button]}
              onPress={next}
            >
              Continuar
            </Button>
          </View>
        </View>
        <View style={style.page} key="2">
          <View style={style.content}>
            <Text style={[SharedStyles.h2, { fontSize: 24 }]}>Administra tus Horarios</Text>
            <Onboarding2SVG style={style.onboardingImage} />
            <Text style={[SharedStyles.p, { textAlign: 'center' }]}>
              Reserva tus horarios, de esta manera estarás organizad@.{'\n'}
              Nosotros te avisaremos cuando esten listos los horarios que has reservado.
            </Text>
            <Button
              style={[SharedStyles.backgroundPrimary, style.button]}
              onPress={next}
            >
              Continuar
            </Button>
          </View>
        </View>
        <View style={style.page} key="3">
          <View style={style.content}>
            <Text style={[SharedStyles.h2, { fontSize: 24 }]}>Conoce tus Ganancias</Text>
            <Onboarding3SVG style={style.onboardingImage} />
            <Text style={[SharedStyles.p, { textAlign: 'center' }]}>
              Tus ganancias desde la aplicación. Siempre sabrás cuando
              se ha realizado un pago por ofrecer tus servicios.
            </Text>
            <Button
              style={[SharedStyles.backgroundPrimary, style.button]}
              onPress={() => navigation.navigate('Main', {
                screen: 'Contract',
              })}>
              Estoy listo
            </Button>
          </View>
        </View>
      </PagerView>
      <View style={SharedStyles.centerContent}>
        <Footer style={{ color: '#222' }} />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingImage: {
    width: '90%',
    marginVertical: 20
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  button: {
    marginTop: 20,
    width: 250
  }
});