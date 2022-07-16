import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import Button from '../../../components/ui/Button';
import UserImage from '../../../components/user/UserImage';
import { SharedStyles } from '../../../styles/shared-styles';

export default function Employee() {
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Empleado" />
      <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
        <View style={styles.info}>
          <UserImage />
          <View style={styles.infoText}>
            <Text>ID: D0MIL10</Text>
            <Text>Liliana Berrio Saldarriaga</Text>
            <Text>EXPERIENCIA: 3 años</Text>
          </View>
        </View>
        <View>
          <View></View>
          <View>
            <Button>Ver más</Button>
          </View>
        </View>
        <Text>Reseñas</Text>
        <TouchableOpacity>

        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// PD
const styles = StyleSheet.create({
  info: {

  },
  infoText: {

  }
});