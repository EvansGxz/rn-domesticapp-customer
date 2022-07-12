import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import useFetch from 'use-http';
import { SharedStyles } from '../../../styles/shared-styles';

// COMPONENTs
import Loader from '../../../components/Loader';
import Button from '../../../components/ui/Button';
import CouponCard from '../../../components/cards/CouponCard';
import UnderlinedInput from '../../../components/ui/UnderlinedInput';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import { useAuth } from '../../../hooks/use-auth';

const { height } = Dimensions.get('screen');
export default function Coupons() {
  const { state } = useAuth();
  const {
    loading,
    error,
    data = [],
  } = useFetch(`/cupon_users/${state.user.id}`, {}, []);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>('');
  const [isPress, setIsPress] = useState<boolean>(false);

  const dataCupon = 'limp20';
  const validate = () => {
    setIsPress(true);
    setTimeout(() => {
      setIsPress(false);
    }, 2500);
    if (coupon == dataCupon) {
      console.log('Cupon valido');
      setIsValid(true);
    } else {
      console.log('Cupon invalido');
      setIsValid(false);
    }
  };

  const inputCoupon = useCallback((value) => setCoupon(value), [coupon])

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Cupones" />
      <View style={[SharedStyles.mainScreen, { paddingTop: 15 }]}>
        <View style={{paddingHorizontal: 15}}>
          <View style={[SharedStyles.card, styles.couponValidation]}>
            <UnderlinedInput
              style={styles.input}
              placeholder="Ingresa tu cupon"
              onChangeText={(value: string) => inputCoupon(value)}
            />
            <Button
              onPress={validate}
              textStyle={SharedStyles.smallButtonText}
              style={SharedStyles.smallButton}>
              Validar
            </Button>
          </View>
          <View style={styles.validation}>
            {isPress && (
              isValid ? (
                <Text style={styles.textValidateTrue}>
                  ¡Cupón válido!
                </Text>
              ) : (
                <Text style={styles.textValidateFalse}>
                  ¡Cupón inválido!
                </Text>
              )
            )}
          </View>
          <Text style={SharedStyles.h2}>Mis cupones</Text>
        </View>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Text>{error.message}</Text>
          ) : (
            <FlatList
              data={data}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              keyExtractor={(key: any) => key.id}
              style={{ height: height / 1 }}
              renderItem={({ item }) => {
                delete item.customer;
                return <CouponCard coupon={item.cupon} />;
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  couponValidation: {
    flexDirection: 'row',
    padding: 25,
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  validation: {
    top: 10,
    left: '10%',
    textAlignVertical: 'center',
  },
  textValidateTrue: {
    color: 'green',
  },
  textValidateFalse: {
    color: 'red',
  },
});
