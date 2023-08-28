import { View, Text, Modal, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon1 from '@expo/vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearErrors, getUser, updateProfile } from '../../actions/userActions';
import { auth } from "../../firebase.config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Toast from 'react-native-root-toast';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { useRef } from 'react';

const isValidEmail = (email) => {
    // Regular expression to check for a basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const EditProfileModal = ({ profileModal, setProfileModal }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState('');
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(
        (state) => state.user
    );
    const { error, isUpdated, loading } = useSelector(
        (state) => state.updateUser
    );
    const recaptchaVerifier = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            setName(user.name);
            setEmail(user.email);
            setPhoneNo(user.phoneNo);
        }

        if (error) {
            Toast.show(error, { duration: Toast.durations.SHORT });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Toast.show("Profile Updated Successfully", { duration: Toast.durations.SHORT });
            dispatch(getUser());

            dispatch({
                type: UPDATE_USER_RESET,
            });
        }
    }, [dispatch, error, isAuthenticated, user, isUpdated]);

    const [otpSent, setOtpSent] = useState(false);
    const [code, setCode] = useState(0);
    const updateProfileSubmit = () => {
        if (email !== "") {
            if (!isValidEmail(email)) {
                Toast.show('Enter a valid email.', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 });
                return;
            }
        }
        let myForm = email === "" ? {
            name,
            phoneNo,
        } :
            {
                name,
                email,
                phoneNo,
            };
        dispatch(updateProfile(myForm));
        setProfileModal(false);
    }
    const [loading1, setLoading1] = useState(false);

    const [verificationId, setVerificationId] = useState(null);

    const onSignUp = async () => {
        try {
            setLoading1(true);
            const phoneProvider = new PhoneAuthProvider(auth);
            const verification = await phoneProvider.verifyPhoneNumber(
                `+91${phoneNo}`,
                recaptchaVerifier.current
            );
            setVerificationId(verification);
            setLoading1(false);
            setOtpSent(true);
            Toast.show('OTP Sent Successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
        } catch (error) {
            Toast.show('There was an error sending OTP.', { duration: Toast.durations.SHORT, backgroundColor: 'red', shadowColor: 'black', position: -100 })
            setLoading1(false);
        }
    };

    const confirmCode = async (code) => {
        setLoading1(true);
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                Number(code)
            );

            const userCredential = await signInWithCredential(auth, credential);

            Toast.show('OTP Verified!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
            setLoading1(false);
            updateProfileSubmit();
            setOtpSent(false);

        } catch (error) {
            console.log(error);
            setLoading1(false);
            Toast.show('Incorrect OTP!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
            // Handle error, maybe show an error message to the user
        }
    };


    return (
        <Modal
            animationType='fade'
            transparent={true}
            onRequestClose={() => setProfileModal(!profileModal)}
            visible={profileModal}
        >

            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {
                    loading ? <ActivityIndicator /> :
                        <View style={{
                            backgroundColor: 'white',
                            height: otpSent ? 450 : 375,
                            width: 350,
                        }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                    }}>
                                    Update Details
                                </Text>
                                <View
                                    style={{
                                        marginBottom: 25,
                                        marginTop: 10,
                                        borderBottomWidth: 1,
                                        borderColor: 'grey',
                                        width: '50%',
                                    }}
                                />
                                <View style={styles.shippingInfoInput}>
                                    <Icon1 name='account' size={25} />
                                    <TextInput value={name} onChangeText={setName} placeholder='Name' style={{
                                        textAlignVertical: 'top',
                                        padding: 10,
                                        marginLeft: 10,
                                        width: '85%'
                                    }} />
                                </View>
                                <View style={styles.shippingInfoInput}>
                                    <Icon1 name='email' size={25} />
                                    <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={{
                                        padding: 10,
                                        marginLeft: 10,
                                        width: '85%'
                                    }} />
                                </View>

                                <View style={styles.shippingInfoInput}>
                                    <Icon1 name='phone' size={25} />
                                    <TextInput editable={!otpSent} value={phoneNo && phoneNo.toString()} onChangeText={setPhoneNo} placeholder='Phone Number' style={{
                                        padding: 10,
                                        marginLeft: 10,
                                        width: '85%'
                                    }} />
                                </View>
                                {
                                    otpSent ?
                                        <View style={styles.shippingInfoInput}>
                                            <Icon1 name='phone' size={25} />
                                            <TextInput value={code && code.toString()} onChangeText={setCode} placeholder='Enter 6-Digit Code' style={{
                                                padding: 10,
                                                marginLeft: 10,
                                                width: '85%'
                                            }} />
                                        </View> : <></>
                                }
                                <FirebaseRecaptchaVerifierModal
                                    ref={recaptchaVerifier}
                                    firebaseConfig={auth.config}
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '100%'
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 20,
                                            padding: 5,
                                            backgroundColor: '#26a541'
                                        }}
                                        onPress={() => setProfileModal(false)}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: 'white'
                                        }}>
                                            CLOSE
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        otpSent ? <TouchableOpacity
                                            onPress={() => confirmCode(code)}
                                            style={{
                                                marginTop: 20,
                                                padding: 5,
                                                backgroundColor: '#26a541',
                                                width:65,
                                            }}>
                                            {loading1 ?
                                                    <ActivityIndicator color={'white'} /> :
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: 'white'
                                                        }}>
                                                        Confirm

                                                    </Text>
                                                }
                                        </TouchableOpacity> :
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => onSignUp()}
                                                style={{
                                                    marginTop: 20,
                                                    padding: 5,
                                                    width:65,
                                                    backgroundColor: '#26a541'
                                                }}>
                                                {loading1 ?
                                                    <ActivityIndicator color={'white'} /> :
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            color: 'white'
                                                        }}>
                                                        Get Otp

                                                    </Text>
                                                }
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                }
            </View>
        </Modal>
    )
}

export default EditProfileModal

const styles = StyleSheet.create({
    shippingInfoInput: {
        flexDirection: 'row',
        borderWidth: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    }
})