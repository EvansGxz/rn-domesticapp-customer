import React, { useContext } from 'react';
import * as Linking from 'expo-linking';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TitledHeader from '../../../components/headers/TitledHeader';
import MenuOptionButton from '../../../components/ui/MenuOptionButton';
import UserInfo from '../../../components/user/UserInfo';
import ContractIcon from '../../../resources/img/menu/contract.svg';
import SupportIcon from '../../../resources/img/menu/support.svg';
import CouponIcon from '../../../resources/img/profile-icons/coupon.svg';
import DirectionIcon from '../../../resources/img/profile-icons/direction.svg';
import NotificationIcon from '../../../resources/img/profile-icons/notification.svg';
import WorkIcon from '../../../resources/img/profile-icons/work.svg';
import TermsIcon from '../../../resources/img/profile-icons/terms.svg';
import PolicyIcon from '../../../resources/img/profile-icons/policy.svg';
import HistoryIcon from '../../../resources/img/profile-icons/history.svg';
import FingerprintIcon from '../../../resources/img/profile-icons/fingerprint.svg';
import NewsIcon from '../../../resources/img/profile-icons/newletter.svg';
import { useNavigation } from '@react-navigation/native';
import { SharedStyles } from '../../../styles/shared-styles';
import { AuthContext } from '../../../contexts/auth-context';

export default function UserProfile() {
    const navigation = useNavigation<any>();
    const authContext = useContext(AuthContext);

    return (
        <ScrollView style={SharedStyles.mainScreen}>
            <TitledHeader title="Mi Perfil" />
            <UserInfo />
            <View style={styles.menu}>
                <MenuOptionButton
                    text="Editar Mi Perfil"
                    icon={ContractIcon}
                    onPress={() => navigation.navigate('Profile')}
                />
                <MenuOptionButton
                    text="Mi Historial de Servicios"
                    icon={HistoryIcon}
                    onPress={() => navigation.navigate('ServiceHistory')}
                />
                <MenuOptionButton
                    text="Chat de Soporte"
                    icon={SupportIcon}
                    onPress={() => Linking.openURL('https://wa.me/18444684329?text=Necesito ayuda')}
                />
                <Text style={SharedStyles.h2}>Mi Cuenta</Text>
                <MenuOptionButton
                    text="Cupones"
                    icon={CouponIcon}
                    onPress={() => navigation.navigate('Coupons')}
                />
                <MenuOptionButton
                    text="Direcciones"
                    icon={DirectionIcon}
                    onPress={() => navigation.navigate('Directions')}
                />
                <MenuOptionButton
                    text="Notificaciones"
                    icon={NotificationIcon}
                    onPress={() => navigation.navigate('Notifications')}
                />
                <Text style={SharedStyles.h2}>Información</Text>
                <MenuOptionButton
                    text="Trabaja con Domesticapp"
                    icon={WorkIcon}
                    onPress={() => Linking.openURL('https://domesticapp.com.co/vacantes-laborales-domesticapp/')}
                />
                <MenuOptionButton
                    text="Terminos y condiciones"
                    icon={TermsIcon}
                    onPress={() => navigation.navigate('TermsAndConditions')}
                />
                <MenuOptionButton
                    text="Politica de Privacidad"
                    icon={PolicyIcon}
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                />
                <MenuOptionButton
                    text="Autorización y tratamientos"
                    icon={FingerprintIcon}
                    onPress={() => navigation.navigate('AuthorizationAndData')}
                />
                <Text style={SharedStyles.h2}>Labor Social</Text>
                <MenuOptionButton
                    text="NewsLetter"
                    icon={NewsIcon}
                    onPress={() => navigation.navigate('NewsLetter')}
                />
                <Text style={SharedStyles.h2}>Otros</Text>
                <MenuOptionButton
                    text="Cerrar Sesión"
                    icon={NewsIcon}
                    onPress={() => authContext.signOut()}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    menu: {
        padding: 20
    }
});