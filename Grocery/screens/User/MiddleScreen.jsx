import { View, Text } from 'react-native'
import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Login from './Login/Login';
import Register from './Register/Register';
import { PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase.config'
import { checkUser, login, register } from '../../actions/userActions';
import Toast from 'react-native-root-toast';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


const MiddleScreen = () => {
    const [userData, setUserData] = useState({})
    const { loading, isUser, error, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const [loading1, setLoading1] = useState(false)

    const dispatch = useDispatch();
    const navigation = useNavigation();


    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('home');
        }
    }, [isAuthenticated, loading])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (isAuthenticated) {
                    isUser ? dispatch(login(phoneNo)) :
                        dispatch(register(userData));
                    setLoading1(false);
                }
            }
        });
    }, []);

    const route = useRoute();
    const phoneNo = route.params.phoneNo;
    useFocusEffect(
        React.useCallback(() => {
            dispatch(checkUser(phoneNo));
            console.log(isUser);
        }, [dispatch])
    )
    let verificationId = route.params.verificationId;
    const recaptchaVerifier = useRef(null);
    const onSignUp = async () => {
        setLoading1(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            verificationId = await phoneProvider.verifyPhoneNumber(
                `+91${phoneNo}`,
                recaptchaVerifier.current
            );
            setLoading1(false);
            Toast.show('OTP Resent Successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
        } catch (error) {
            console.log(error);
            setLoading1(false);
        }
    };

    const confirmCode = async (code, userData = {}) => {
        setLoading1(true);
        try {
            console.log(code);
            const credential = PhoneAuthProvider.credential(
                verificationId,
                Number(code)
            );

            const userCredential = await signInWithCredential(auth, credential);

            Toast.show('OTP Verified!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })

            isUser ? dispatch(login(phoneNo)) : dispatch(register(userData));
            setLoading1(false);
        } catch (error) {
            console.log(error);
            setLoading1(false);
            Toast.show('Incorrect OTP!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <View>
            <Spinner
                visible={loading}
                textContent={'Loading'}
            />
            {
                loading === false ?
                    isUser ?
                        <Login phoneNo={phoneNo}
                            verification={verificationId}
                            onSignUp={onSignUp}
                            confirmCode={confirmCode}
                            loading1={loading1}
                        /> :
                        <Register phoneNo={phoneNo}
                            verification={verificationId}
                            onSignUp={onSignUp}
                            confirmCode={confirmCode}
                            loading1={loading1}
                            setUserData={setUserData}
                        /> : <></>
            }
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={auth.config}
            />

        </View>
    )
}

export default MiddleScreen