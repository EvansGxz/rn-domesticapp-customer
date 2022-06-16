import { StyleSheet } from 'react-native';
import { COLORS } from '../../config';

export const SharedStyles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: '#fff'
    },
    p: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Poppins_400Regular'
    },
    h2: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#3D4451'
    },
    h2WithoutMargin: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        color: '#3D4451'
    },
    h3: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 16,
        fontWeight: '500'
    },
    mainPadding: { paddingHorizontal: 20, paddingVertical: 10 },
    bottomLine: {
        height: 1,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
        width: '100%'
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    smallButton: {
        width: 100,
        borderRadius: 5,
        padding: 5,
        marginLeft: 15,
        backgroundColor: COLORS.primary
    },
    smallButtonText: {
        fontSize: 15
    },
    fill: {
        flex: 1
    },
    centerContent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundPrimary: {
        backgroundColor: COLORS.primary
    },
    mb: {
        marginBottom: 25
    },
    pd: {
        padding: 17
    }
});