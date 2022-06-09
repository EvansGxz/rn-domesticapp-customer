import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import * as React from "react";
import * as Facebook from 'expo-facebook';
import { login } from "../../services/session-service";

function FacebookScreen({ navigation }) {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '551206009914007',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
        const user = (await response.json())
        Alert.alert('Logged in!', `Hi ${user.name}!`);
        login({social_id: user.id, email: `${user.id}@facebook.com`}, login_social)
        updateUser({image_url: user.picture.data.url})
        console.log(user)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Login with Facebook"
        onPress={logIn}
      />
    </View>
  );
}

export default FacebookScreen;