import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Icon1 from '@expo/vector-icons/MaterialCommunityIcons'
import Icon from '@expo/vector-icons/Ionicons'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { State } from 'country-state-city';
import { saveShippingInfo } from '../../actions/cartActions';
import Toast from 'react-native-root-toast';
import { getUser } from '../../actions/userActions';

const AddressModal = ({
    addressModal,
    setAddressModal,
    address,
    setAddress,
    city,
    setCity,
    state, setState,
    pinCode, setPinCode,
    phoneNo, setPhoneNo, }) => {

    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const { loading, isAuthenticated, error, user } = useSelector(
        (state) => state.user
    );


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
        setAddressModal(false);
        dispatch(getUser());
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            onRequestClose={() => setAddressModal(!addressModal)}
            visible={addressModal}
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
                            height: 550,
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
                                </View>
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
                                        onPress={() => setAddressModal(false)}>

                                        <Text style={{
                                            fontSize: 16,
                                            color: 'white'
                                        }}>
                                            CLOSE
                                        </Text>
                                    </TouchableOpacity>
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
                                            SUBMIT
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                }
            </View>
        </Modal>
    )
}

export default AddressModal

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