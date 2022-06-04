import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Animated, KeyboardAvoidingViewBase, KeyboardAvoidingView, Platform } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import DomIcon from '../../resources/img/ui/dom-app-icon.svg';
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function Auth() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <Tab.Navigator tabBar={(props) => <TabsMenu {...props} />}>
                <Tab.Screen name="Login" options={{ tabBarLabel: 'Iniciar Sesión' }} component={LoginTab} />
                <Tab.Screen name="Register" options={{ tabBarLabel: 'Registrarse' }} component={RegisterTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

function TabsMenu({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const nav = useRoute<any>();

    useEffect(
        () => {
            if (nav.params?.Show === 'Register') {
                navigation.navigate('Register');
            }
        },
        []
    );

    return (
        <View style={style.header}>
            <DomIcon />
            <View style={style.tabs}>
                {
                    state.routes.map((route, index) => {
                        const { options }: any = descriptors[route.key];
                        const isFocused = state.index === index;
                        
                        const onPress = () => {
                            const event: any = navigation.emit({
                                type: 'tabPress',
                                target: route.key
                            } as any);
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        }

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };
                        

                        const inputRange = state.routes.map((_, i) => i);
                        const opacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map(i => (i === index ? 1 : 0))
                        })

                        return (
                            <TouchableOpacity 
                                key={`tab-${index}`} 
                                onPress={onPress}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onLongPress={onLongPress}
                                style={style.tab}
                            >
                                {/* <Animated.Text style={opacity as any}>{options.tabBarLabel}</Animated.Text> */}
                                <Text style={style.tabText}>{options.tabBarLabel}</Text>
                                <Animated.View style={[style.tabIndicator, { opacity }]} />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
}

function LoginTab() {
    const secondRef = useRef();
    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ flex: 1, width: '100%' }}>
                    <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled" extraScrollHeight={80} contentContainerStyle={style.inputsContainer}>
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next'
                                } as any
                            } 
                            style={{ marginTop: 5 }} 
                            label="Email address" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: secondRef,
                                } as any
                            }
                            style={{ marginTop: 25 }}
                            label="Password" 
                        />
                    </KeyboardAwareScrollView>
                </View>
                <View style={style.buttonContainer}>
                    <Button textStyle={style.btnTextAction} style={style.btnAction}>Iniciar Sesión</Button>
                    <Footer style={style.footerColor} />
                </View>
            </View>
        </View>
    );
}

function RegisterTab() {
    const secondRef = useRef();
    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ flex: 1, width: '100%' }}>
                    <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled" extraScrollHeight={80} contentContainerStyle={style.inputsContainer}>
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next'
                                } as any
                            } 
                            style={{ marginTop: 5 }} 
                            label="Email address" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: secondRef,
                                } as any
                            }
                            style={{ marginTop: 25 }}
                            label="Password" 
                        />
                    </KeyboardAwareScrollView>
                </View>
                <View style={style.buttonContainer}>
                    <Button textStyle={style.btnTextAction} style={style.btnAction}>Registrarse</Button>
                    <Footer style={style.footerColor} />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    footerColor: {
        color: '#222'
    },
    tabScreenContainer: {
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        width: '85%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    btnAction: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: COLORS.primary
    },
    btnTextAction: {
        fontSize: 24
    },
    inputsContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start'
    },
    header: {
        backgroundColor: '#fff',
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        alignItems: 'center',
        marginBottom: 5,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    tabs: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
    },
    tab: {
        width: '50%'
    },
    tabText: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    tabIndicator: {
        backgroundColor: COLORS.secondary,
        height: 3,
        width: '100%'
    },
    iconContainer: {

    }
});