/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { COLORS } from '../../config';
import {View, Text, Button} from 'react-native';

type MyState = {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<MyState> {
  state: MyState = {hasError: false};
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError() {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return {hasError: true};
  }

  render() {

    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
          }}>
          <Text
            style={{
              fontFamily: 'serif',
              fontWeight: 'bold',
              color: COLORS.lightGray,
              textAlign: 'center',
              fontSize: 30,
            }}>
            Ah Ocurrido Un Error....
          </Text>
          <Button
            onPress={() => {
              this.state.hasError = false;
            }}
            title="Resetear"
            color={COLORS.secondary}
          />
        </View>
      );
    }
    return this.props.children;
  }
}
