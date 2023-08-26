import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import React, { Component, useEffect, useRef, useState } from 'react'
// import OTPInput from "react-native-otp-input-fields";
import OTPInput from '../OtpInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase.config'
import Toast from 'react-native-root-toast';

const isValidEmail = (email) => {
    // Regular expression to check for a basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    };

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { label, ...props } = this.props;
        const { isFocused, inputValue } = this.state; // Added inputValue to state
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: !isFocused && inputValue === '' ? 18 : 0, // Adjusted top condition
            fontSize: !isFocused && inputValue === '' ? 13 : 10, // Adjusted fontSize condition
            color: !isFocused && inputValue === '' ? 'grey' : '#000',
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Text style={labelStyle}>
                    {label}
                </Text>
                <TextInput
                    {...props}
                    cursorColor={'black'}
                    style={{ height: 23, fontSize: 15, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={inputValue} // Added value prop
                    blurOnSubmit
                />
            </View>
        );
    }
}

const Register = ({ phoneNo, onSignUp, confirmCode, loading1, setUserData }) => {

    //sorry for this ;-;

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(30);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const recaptchaVerifier = useRef(null);

    useEffect(() => {
        let intervalId;

        if (resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => {

            clearInterval(intervalId);
        };
    }, [resendTimer]);
    const handleSubmit = (e) => {

        let temp = "";
        temp += pin1;
        temp += pin2;
        temp += pin3;
        temp += pin4;
        temp += pin5;
        temp += pin6;
        setOtp(temp);
        if (email !== "") {
            if (!isValidEmail(email)) {
                Toast.show('Enter a valid email.', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 });
                return;
            }
        }
        let myForm = email === "" ? {
            name,
            phoneNo,
            otp
        } :
            {
                name,
                email,
                phoneNo,
                otp
            };

        // setUserData(myForm);
        // console.log(temp);
        confirmCode(temp, myForm);
    }

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
                            alignItems: 'center',
                            height: 480,
                            marginTop: 20,
                            borderRadius: 40,
                            elevation: 5,
                            backgroundColor: '#fff',

                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                marginTop: 25,
                                marginBottom: 10,
                            }}>
                            Register To Grocery
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                width: 300,
                                color: 'grey',
                                textAlign: 'center'
                            }}>
                            Please enter your details for better shopping experience.
                        </Text>

                        <View
                            style={{
                                // backgroundColor:'red',
                                height: 50,
                                width: 230,
                                marginTop: 20

                            }}>
                            <FloatingLabelInput onChangeText={(text) => {
                                setName(text);
                            }} label='Enter Your Name*' />
                        </View>
                        <View
                            style={{
                                // backgroundColor:'red',
                                height: 50,
                                width: 230,
                                marginTop: 10

                            }}>
                            <FloatingLabelInput textContentType='emailAddress' onChangeText={(text) => {
                                setEmail(text);
                            }} label='Enter Your Email (optional)' />
                        </View>
                        <View
                            style={{
                                width: 300,
                                marginTop: 20
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    fontWeight: '500'
                                }}>
                                Verify Phone Number
                            </Text>
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 12,
                                    color: 'grey',
                                    textAlign: 'center',
                                }}>
                                An SMS with 6-digit OTP was sent to
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    textAlign: 'center',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: "center"
                                }}>{`+91 ${phoneNo} `} <TouchableOpacity
                                    onPress={() => navigation.navigate('signin')}><Text style={{
                                        fontSize: 13, marginBottom: -3,
                                        textDecorationLine: 'underline',
                                        color: 'blue'
                                    }}>Change</Text></TouchableOpacity></Text>
                            <OTPInput
                                setPin1={setPin1}
                                setPin2={setPin2}
                                setPin3={setPin3}
                                setPin4={setPin4}
                                setPin5={setPin5}
                                setPin6={setPin6} />
                            {/* <OTPInput onChangeText={setOtp} value={otp} /> */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    marginTop: 5
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}>
                                    {`Did not recieved OTP? `}
                                </Text>
                                <TouchableOpacity
                                    disabled={loading1 || resendTimer > 0}
                                    onPress={() => {
                                        setResendTimer(30);
                                        onSignUp();

                                    }}>
                                    {
                                        loading1 ? <Text>
                                            Please Wait...
                                        </Text> :
                                            <Text style={{
                                                textDecorationLine: 'underline',
                                            }}>{`Resend(${resendTimer}s)`}</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20
                                }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={{
                                        backgroundColor: '#4a7dff',
                                        padding: 10,
                                        borderRadius: 20
                                    }}>
                                    {
                                        loading1 ? <ActivityIndicator color={'white'} /> :
                                            <Text
                                                style={{
                                                    color: 'white'
                                                }}>
                                                Get Started
                                            </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Register

