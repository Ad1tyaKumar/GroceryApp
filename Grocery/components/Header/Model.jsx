import { View, Text, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon1 from '@expo/vector-icons/Feather'
import Icon from '@expo/vector-icons/MaterialIcons';

const Model = ({ modalVisible, setModalVisible, handlePinSubmit, invalid, setPinCode, pincode }) => {



    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <Pressable
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',

                }}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: 250,
                        height: 250,
                        // position: 'absolute',
                        // top: 40,
                        // right: 50,
                        elevation: 20,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10
                        }}>
                        <Icon size={20} name='close' />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginTop: 50,
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: '700'
                        }}>
                        Where do you want your Delivery?
                    </Text>
                    <Text
                        style={{
                            marginTop: 20,
                            fontSize: 15
                        }}>
                        Enter Your Pincode:-
                    </Text>
                    <View
                        style={{
                            width: '65%',
                            marginTop: 25,
                            height: 25,
                            flexDirection: 'row',
                        }}>
                        <TextInput
                            value={pincode.toString()}
                            onSubmitEditing={() => handlePinSubmit()}
                            onChangeText={setPinCode}
                            style={{
                                width: '84%',
                                borderWidth: 1,
                                borderRightWidth: 0,
                                paddingLeft: 5,
                            }} keyboardType='number-pad' />
                        <TouchableOpacity onPress={() => handlePinSubmit()} style={{
                            justifyContent: 'center',
                            backgroundColor: '#26a541',
                            borderWidth: 1,
                            borderLeftWidth: 0,
                        }}>
                            <Icon1 name='check' color={'white'} size={20} />
                        </TouchableOpacity>
                    </View>
                    {
                        invalid ?
                            <Text style={{
                                fontSize: 12,
                                color: 'red',
                                marginTop: 5,
                            }}>Enter A Valid PinCde</Text> : <></>
                    }
                </View>

            </Pressable>
        </Modal>
    )
}

export default Model