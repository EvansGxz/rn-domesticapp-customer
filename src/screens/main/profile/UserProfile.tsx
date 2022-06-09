import React from 'react';
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
import FingerprintIcon from '../../../resources/img/profile-icons/fingerprint.svg';
import NewsIcon from '../../../resources/img/profile-icons/newletter.svg';
import { useNavigation } from '@react-navigation/native';

export default function UserProfile() {
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TitledHeader title="Mi Perfil" />
            <UserInfo />
            <View style={styles.menu}>
                <MenuOptionButton
                    text="Editar Mi Perfil"
                    icon={ContractIcon}
                />
                <MenuOptionButton
                    text="Mi Historial de Servicios"
                    icon={ContractIcon}
                />
                <MenuOptionButton
                    text="Chat de Soporte"
                    icon={SupportIcon}
                />
                <Text style={styles.headerText}>Mi Cuenta</Text>
                <MenuOptionButton
                    text="Cupones"
                    icon={CouponIcon}
                    onPress={() => navigation.navigate('Coupons')}
                />
                <MenuOptionButton
                    text="Direcciones"
                    icon={DirectionIcon}
                />
                <MenuOptionButton
                    text="Notificaciones"
                    icon={NotificationIcon}
                />
                <Text style={styles.headerText}>Información</Text>
                <MenuOptionButton
                    text="Trabaja con Domesticapp"
                    icon={WorkIcon}
                />
                <MenuOptionButton
                    text="Terminos y condiciones"
                    icon={TermsIcon}
                />
                <MenuOptionButton
                    text="Politica de Privacidad"
                    icon={PolicyIcon}
                />
                <MenuOptionButton
                    text="Autorización y tratamientos"
                    icon={FingerprintIcon}
                />
                <Text style={styles.headerText}>Labor Social</Text>
                <MenuOptionButton
                    text="NewsLetter"
                    icon={NewsIcon}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    menu: {
        padding: 20
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 20
    }
});