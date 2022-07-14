import React from 'react';
import { Modal, View } from 'react-native';


interface ModalUIProps {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[]
}

export default function ModalUI(props: ModalUIProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isOpen}>
      <View
        style={{
          backgroundColor: "#909090",
          opacity: 0.79,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {props.children}
      </View>
    </Modal>
  )
}
