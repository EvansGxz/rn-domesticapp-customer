import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuth, setAuth] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          isAuth ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}