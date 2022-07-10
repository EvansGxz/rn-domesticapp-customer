import React from "react";
import { Text, ScrollView, View } from "react-native";
import * as Linking from 'expo-linking';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import { SharedStyles } from "../../../styles/shared-styles";
import SupportChatSVG from '../../../resources/img/support-icons/chat-icon.svg';
import HandSVG from '../../../resources/img/support-icons/hand-icon.svg';
import NotificationsSVG from '../../../resources/img/profile-icons/notification.svg';
import BandsSVG from '../../../resources/img/support-icons/bands-icon.svg';
import LocationSVG from '../../../resources/img/support-icons/location-icon.svg';

export default function HelpCenter({navigation}: any) { 

    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Centro de Ayuda" />
            <ScrollView style={SharedStyles.mainPadding} contentContainerStyle={{ paddingBottom: 100 }}>
                <Text style={SharedStyles.p}>
                    Para tu comodidad. Tenemos distintos articulos
                    donde solucionar tus dudas, o puedes contactar con nuestro
                    Centro de Soporte y Ayuda.
                </Text>
                <Text style={SharedStyles.h2}>Temas de ayuda</Text>
                <MenuOption 
                    size={58} 
                    icon={SupportChatSVG} 
                    text="Chat de Soporte" 
                    onPress={() => Linking.openURL('https://wa.me/18444684329')}
                />
                <MenuOption 
                    size={58} 
                    icon={LocationSVG} 
                    text="¿Necesitas ayuda con tu ultimo servicio?" 
                    onPress={() => Linking.openURL('https://wa.me/18444684329?text=Necesito ayuda')}
                />
                <MenuOption 
                    size={58} 
                    icon={HandSVG} 
                    text="¿Tienes alguna duda?" 
                    onPress={() => navigation.navigate('FaqsMenuScreen')}
                />
                <MenuOption 
                    size={58} 
                    icon={NotificationsSVG} text="Notificaciones" 
                    onPress={() => navigation.navigate('Notifications')}
                />
                <MenuOption 
                    size={58} 
                    icon={BandsSVG} 
                    text="Daño en el Servicio o Accidentes Laborales" 
                    onPress={() => navigation.navigate('Reports')}
                />
            </ScrollView>
        </View>
    );
}