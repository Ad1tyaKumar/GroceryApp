import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import OtpInput from '../OtpInput'
import { useNavigation, useRoute } from '@react-navigation/native';

const Login = ({ phoneNo, onSignUp, confirmCode, loading1 }) => {
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [pin6, setPin6] = useState("");
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

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
    console.log(otp);
    confirmCode(temp);
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
              height: 300,
              marginTop: 20,
              borderRadius: 40,
              elevation: 5,
              backgroundColor: '#fff',

            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                marginTop: 25,
                marginBottom: 15,
              }}>
              Verify Phone Number
            </Text>
            <Text>
              An SMS with 6-digit OTP was sent to
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: "center"
              }}>
              {`+91 ${phoneNo} `}
              <TouchableOpacity
                onPress={() => navigation.navigate('signin')}><Text style={{
                  fontSize: 13, marginBottom: -3,
                  textDecorationLine: 'underline',
                  color: 'blue'
                }}>Change</Text>
              </TouchableOpacity>
            </Text>
            <OtpInput
              setPin1={setPin1}
              setPin2={setPin2}
              setPin3={setPin3}
              setPin4={setPin4}
              setPin5={setPin5}
              setPin6={setPin6} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 20,
                marginTop: 10
              }}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                {`Did not recieved OTP? `}
              </Text>
              <TouchableOpacity
                disabled={resendTimer>0}
                onPress={() => {
                  onSignUp();
                  setResendTimer(30);
                }}>
                <Text style={{
                  textDecorationLine: 'underline',
                }}>{`Resend(${resendTimer}s)`}</Text>
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
      </ScrollView>
    </View>
  )
}

export default Login