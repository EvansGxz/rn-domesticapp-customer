import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const sourceImage = 'https://eldiariony.com/wp-content/uploads/sites/2/2022/04/GettyImages-100964340.jpg?quality=60&strip=all&w=1200';

export interface UserImageProps {
    size?: number;
}

export default function UserImage(props: UserImageProps) {
    return (
        <ImageBackground
            imageStyle={style.userImageCenter} 
            style={[style.userImage, props.size ? { width: props.size, height: props.size } : {}]} 
            source={{ uri: sourceImage }} 
        />
    );
}

const style = StyleSheet.create({
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 150,
        marginRight: 12.5
    },
    userImageCenter: {
        resizeMode: 'center',
        borderRadius: 150
    },
});