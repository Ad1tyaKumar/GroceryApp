import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomNavigator from '../../components/Bottom/BottomNavigator';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { login } from '../../actions/userActions';
import HeaderAndBottom from '../../components/Animated/HeaderAndBottom';

const SignIn = () => {
    GoogleSignin.configure();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;
    const { isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('home');
        }
    }, [isAuthenticated])

    const signIn = async () => {
        try {
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            dispatch(login(userInfo, "google"));
            navigation.navigate("home");
            // console.log(userInfo);
            //   setState({ userInfo });
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <>
            <View style={{ height: '100%', marginTop : 90 }}>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            marginTop: 30
                        }}>Welcome To Grocery</Text>
                    <View
                        style={{
                            width: '80%',
                            height: 380,
                            marginTop: 20,
                            borderRadius: 40,
                            elevation: 5,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            marginBottom: 5
                        }}>
                        <Text
                            style={{
                                fontSize: 25,
                                marginTop: 25,
                                fontWeight: '300'
                            }}>
                            Sign In to Grocery
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginBottom: 50,
                            }}>
                            To Access Your Address and orders
                        </Text>
                        <GoogleSigninButton

                            size={GoogleSigninButton.Size.Wide}
                            style={{ width: 250, marginTop: 20 }}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={signIn} />
                    </View>
                    {/* </View> */}
                </ScrollView>
            </View>
            <HeaderAndBottom scrollY={scrollY} offsetAnim={offsetAnim} />
        </>
    )
}

export default SignIn