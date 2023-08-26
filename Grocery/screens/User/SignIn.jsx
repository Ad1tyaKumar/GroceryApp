import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import Toast from 'react-native-root-toast';
import BottomNavigator from '../../components/Bottom/BottomNavigator'
import Register from './Register/Register';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Login from './Login/Login';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, login, register } from '../../actions/userActions';
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
const SignIn = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [phoneNo, setPhoneNo] = useState(0);
    const [loading1, setLoading1] = useState(false);

    const recaptchaVerifier = useRef(null);
    const { loading, isUser, error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if(isAuthenticated){
            navigation.navigate('profile');
        }
    }, [isAuthenticated])

    const onSignUp = async () => {
        try {
            setLoading1(true);
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                `+91${phoneNo}`,
                recaptchaVerifier.current
            );
            setLoading1(false);
            Toast.show('OTP Sent Successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
            navigation.navigate('middleScreen', {
                phoneNo, verificationId
            })
        } catch (error) {
            console.log(error);
            setLoading1(false);
        }

    };

    return (
        <View
            style={{
                height: '100%'
            }}>
            <ScrollView>
                <View
                    style={{
                        height: Dimensions.get('window').height - 80,
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
                            alignItems: 'center'
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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: 'grey'
                            }}>
                            <Text>
                                +91
                            </Text>
                            <TextInput
                                onChangeText={setPhoneNo}
                                style={{
                                    marginLeft: 5
                                }}
                                keyboardType='number-pad'
                                placeholder='Enter Your Phone number'
                            />
                        </View>
                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={auth.config}
                        />
                        <TouchableOpacity
                            disabled={phoneNo.toString().length !== 10 || loading1}
                            onPress={() => {
                                // console.log(loading, isUser);
                                dispatch(checkUser(phoneNo));

                                onSignUp();
                                // Toast.show('OTP SENT!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })

                            }}
                            activeOpacity={0.6}
                            style={{
                                backgroundColor: '#4a7dff',
                                padding: 5,
                                borderRadius: 15,
                                marginTop: 100,
                                width: 80,
                                alignItems: 'center',
                                opacity: phoneNo.toString().length !== 10 ? 0.6 : 1
                            }}>
                            {
                                !loading1 ?
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 15,
                                            fontWeight: '500'
                                        }}>
                                        Get Otp
                                    </Text> : <ActivityIndicator color={'white'} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <BottomNavigator />
        </View>
    )
}

export default SignIn