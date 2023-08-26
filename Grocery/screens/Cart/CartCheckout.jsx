import { View, Text, TextInput, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import React from 'react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Icon from '@expo/vector-icons/Ionicons'
import Icon1 from '@expo/vector-icons/MaterialCommunityIcons'
import ConfirmOrder from './ConfirmOrder';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { saveShippingInfo } from '../../actions/cartActions';
import Toast from 'react-native-root-toast';
import { State } from 'country-state-city';
import { Picker } from '@react-native-picker/picker';

import { useEffect } from 'react';
import Payment from './Payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CartCheckout = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, error, user } = useSelector(
        (state) => state.user
    );
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    useEffect(() => {
        if (isAuthenticated) {
            if (user.shippingAddress) {
                setAddress(user.shippingAddress.address);
                setCity(user.shippingAddress.city);
                setPinCode(user.shippingAddress.pinCode);
                setPhoneNo(user.shippingAddress.phoneNo);
                setState(user.shippingAddress.state);
            }
        }
    }, [isAuthenticated])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Toast.show('Cancelled!.', { duration: Toast.durations.SHORT })

                setActiveStep(0);
            };
            const goback = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => goback.remove();
        }, [])
    );

    const shippingSubmit = () => {
        if (!phoneNo || phoneNo.toString().length !== 10) {
            Toast.show('Phone Number should be 10-digits.', { duration: Toast.durations.SHORT })
            return;
        }
        if (!address || address.length <= 4) {
            Toast.show('Please Enter Your Address.', { duration: Toast.durations.SHORT })
            return;
        }
        if (!pinCode || pinCode.toString().length !== 6) {
            Toast.show('Enter a valid PinCode.', { duration: Toast.durations.SHORT })
            return;
        }
        if (!state) {
            Toast.show('Please enter state.', { duration: Toast.durations.SHORT })
            return;
        }
        dispatch(
            saveShippingInfo({
                address,
                city,
                state,
                country: "India",
                pinCode: parseInt(pinCode),
                phoneNo: parseInt(phoneNo),
            })
        );
        setActiveStep(1);
    };

    const confirmOrder = async () => {
        try {
            const delivery = 0;
            const subtotal = cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
            );
            const totalPrice = cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price + delivery,
                0
            );
            const data = {
                subtotal,
                delivery,
                totalPrice,
            };
            await AsyncStorage.setItem('orderInfo', JSON.stringify(data));
            setActiveStep(2);
        } catch (error) {
            Toast.show('Some Error Occurred!', { duration: Toast.durations.LONG });
        }
    }
    return (
        loading ? <ActivityIndicator size={25} /> :
            <View style={{
                flex: 1
            }}>
                <ProgressSteps activeStep={activeStep} >
                    <ProgressStep removeBtnRow={true} label="Shipping Info">
                        <View
                            style={{
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                }}>
                                Shipping Details
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
                                <Icon name='home-sharp' size={25} />
                                <TextInput value={address} onChangeText={setAddress} multiline={true} placeholder='Address' numberOfLines={3} style={{
                                    textAlignVertical: 'top',
                                    padding: 10,
                                    marginLeft: 10,
                                    width: '85%'
                                }} />
                            </View>
                            <View style={styles.shippingInfoInput}>
                                <Icon1 name='city' size={25} />
                                <TextInput value={city} onChangeText={setCity} placeholder='City' style={{
                                    padding: 10,
                                    marginLeft: 10,
                                    width: '85%'
                                }} />
                            </View>
                            <View style={styles.shippingInfoInput}>
                                <Icon name='location-sharp' size={25} />
                                <TextInput value={pinCode && pinCode.toString()} onChangeText={setPinCode} placeholder='Pin Code' style={{
                                    padding: 10,
                                    marginLeft: 10,
                                    width: '85%'
                                }} />
                            </View>
                            <View style={styles.shippingInfoInput}>
                                <Icon1 name='phone' size={25} />
                                <TextInput value={phoneNo && phoneNo.toString()} onChangeText={setPhoneNo} placeholder='Phone Number' style={{
                                    padding: 10,
                                    marginLeft: 10,
                                    width: '85%'
                                }} />
                            </View>
                            <View style={styles.shippingInfoInput}>
                                <Icon1 name='flag' size={25} />
                                <Picker
                                    style={{
                                        width: '85%'
                                    }}
                                    selectedValue={state}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setState(itemValue)
                                    }>
                                    {
                                        State.getStatesOfCountry("IN").map((item, index) => (
                                            <Picker.Item key={index} label={item.name} value={item.isoCode} />
                                        ))
                                    }
                                </Picker>
                                {/* <TextInput value={state} onChangeText={setState} placeholder='State' style={{
                                    padding: 10,
                                    marginLeft: 10,
                                    width: '85%'
                                }} /> */}
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    shippingSubmit();
                                }}
                                style={{
                                    marginTop: 20,
                                    padding: 5,
                                    backgroundColor: '#26a541'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ProgressStep>
                    <ProgressStep removeBtnRow={true} label="Confirm order">
                        <ConfirmOrder />
                        <View style={{
                            width: '100%', flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 30,
                        }}>
                            <TouchableOpacity
                                onPress={() => setActiveStep(0)}
                                style={{
                                    marginTop: 20,
                                    padding: 5,
                                    backgroundColor: '#26a541'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                    Go Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={confirmOrder}
                                style={{
                                    marginTop: 20,
                                    padding: 5,
                                    backgroundColor: '#26a541'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ProgressStep>
                    <ProgressStep removeBtnRow={true} label="Payment">
                        <Payment />

                        <View style={{
                            width: '100%', flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 30,
                        }}>
                            <TouchableOpacity
                                onPress={() => setActiveStep(1)}
                                style={{
                                    marginTop: 20,
                                    padding: 5,
                                    backgroundColor: '#26a541'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'white'
                                    }}>
                                    Go Back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
    )
}

export default CartCheckout

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