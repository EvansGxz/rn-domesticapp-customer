import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SharedStyles } from "../../styles/shared-styles";
import { MenuOptionProps } from "../../interfaces/interfaces";

const MenuOption = (props: MenuOptionProps) => {
  const {text, size, onPress} = props;
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}>
        <View style={[styles.iconCenter, { width: size, height: size }]}>
          <props.icon height={size} />
        </View>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <View style={SharedStyles.bottomLine} />
    </>
  );
}

export default React.memo(MenuOption);

const styles = StyleSheet.create({
  iconCenter: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#3D4451',
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  }
});