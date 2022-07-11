import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import useFetch from 'use-http';
import {AuthContext} from '../../../contexts/auth-context';
import {SharedStyles} from '../../../styles/shared-styles';

// COMPONENTs
import Loader from '../../../components/Loader';
import Button from '../../../components/ui/Button';
import CouponCard from '../../../components/cards/CouponCard';
import UnderlinedInput from '../../../components/ui/UnderlinedInput';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';

const {height} = Dimensions.get('screen');
export default function Coupons() {
  const state = useContext(AuthContext);
  const {
    loading,
    error,
    data = [],
  } = useFetch(`/cupon_users/${state.getState().user.id}`, {}, []);

  const [isValid, setIsValid] = useState(false);
  const [cupon, setCupon] = useState('');
  const [isPress, setIsPress] = useState(false);

  const dataCupon = 'limp20';
  const validate = () => {
    setIsPress(true);
    setTimeout(() => {
      setIsPress(false);
    }, 2500);
    if (cupon == dataCupon) {
      console.log('Cupon valido');
      setIsValid(true);
    } else {
      console.log('Cupon invalido');
      setIsValid(false);
    }
  };
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Cupones" />
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
            style={{height: height - (StatusBar.currentHeight as number) * 7.6}}
            ListHeaderComponent={() => (
              <View style={[SharedStyles.mainScreen, {padding: 15}]}>
                <View style={[SharedStyles.card, styles.couponValidation]}>
                  <UnderlinedInput
                    style={styles.input}
                    placeholder="Ingresa tu cupon"
                    value={cupon}
                    onChangeText={setCupon}
                  />
                  <Button
                    textStyle={SharedStyles.smallButtonText}
                    style={SharedStyles.smallButton}
                    onPress={validate}>
                    Validar
                  </Button>
                </View>
                <View style={styles.validation}>
                  {isPress ? (
                    isValid ? (
                      <Text style={styles.textValidateTrue}>
                        ¡Cupón válido!
                      </Text>
                    ) : (
                      <Text style={styles.textValidateFalse}>
                        ¡Cupón inválido!
                      </Text>
                    )
                  ) : (
                    <View></View>
                  )}
                </View>
                <Text style={SharedStyles.h2}>Mis cupones</Text>
              </View>
            )}
            stickyHeaderIndices={[0]}
            renderItem={({item}) => {
              delete item.customer;
              return <CouponCard coupon={item.cupon} />;
            }}
          />
        )}
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
  container: {},
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
