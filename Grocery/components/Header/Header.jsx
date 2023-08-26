import { View, Button, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, StyleSheet, TextInput, ActivityIndicator, Modal, Pressable, TouchableWithoutFeedback } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';
import { useSearch } from '../SearchContext';
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addPinCode, getPin, getUser } from '../../actions/userActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItems } from '../../actions/cartActions';
import Icon1 from '@expo/vector-icons/Feather'

const Header = () => {
    const { searchInput, setSearchInput } = useSearch();

    // const [keyword, setKeyword] = useState(searchInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [clicked, setClicked] = useState(false);
    const { pinCode, loading } = useSelector((state) => state.pinCode);
    const [invalid, setInvalid] = useState(false);
    const [pincode, setPinCode] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSearch = () => {
        setClicked(!clicked);
        navigation.navigate('products', { keyword: searchInput, clicked })
    }
    const { loading1: loading1, cartItems } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(getUser());
        }
        dispatch(getPin());

    }, [dispatch, isAuthenticated]);


    useFocusEffect(
        React.useCallback(() => {
            if (isAuthenticated) {
                dispatch(getItems());
            }
        }, [dispatch, isAuthenticated])
    );
    const handlePinSubmit = (e) => {
        setInvalid(false);
        if (pincode.toString().length === 6) {
            dispatch(addPinCode(pincode));
            setModalVisible(false);
        } else {
            setInvalid(true);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            setPinCode(pinCode);
        }, [pinCode])
    )
    return (
        <View>
            <SafeAreaView>
                <View style={styles.nav} >
                    <Icon name="menu" size={30} color="black" onPress={() => navigation.toggleDrawer()} />
                    {/* <Text>K</Text> */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('home')}>
                        <Text style={{ fontSize: 25, fontWeight: '700' }}>
                            LOGO
                        </Text>
                    </TouchableOpacity>
                    {
                        loading ? <ActivityIndicator size={25} color={'white'} /> :
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)} style={[styles.deliverToDiv, { width: (pinCode ? 85 : 95) }]}>
                                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                                    Deliver To:-
                                </Text>

                                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                                    {pinCode ? pinCode : `Add Pincode`}
                                </Text>
                            </Pressable>
                    }
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('cart')}
                        style={styles.cartIcon}>

                        <Icon name="shopping-cart" size={30} color="white" />
                        {/* <Text>H</Text> */}
                        {
                            loading1 ?
                                <ActivityIndicator /> :
                                <Text style={{
                                    position: 'absolute',
                                    right: -2,
                                    top: -5,
                                    backgroundColor: 'red',
                                    color: 'white',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 16,
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: [{ scale: 0.8 }],
                                    fontSize: 16
                                }}>
                                    {cartItems && cartItems.length}
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 40,
                        alignItems: 'center'
                    }}>
                    <TextInput
                        onChangeText={setSearchInput}
                        value={searchInput}
                        onSubmitEditing={handleSearch}
                        placeholder='Search'
                        cursorColor={'black'} style={{
                            borderWidth: 1,
                            height: 30,
                            fontSize: 15,
                            width: 250,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderRightWidth: 0,
                            paddingLeft: 5,
                            borderColor: 'grey'
                        }} />
                    <TouchableOpacity
                        onPress={handleSearch}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: '#26a541',
                            width: 25,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 5,
                            borderWidth: 1,
                            borderLeftWidth: 0,
                            borderBottomRightRadius: 5,
                            borderColor: 'grey'
                        }}>

                        <Icon name='search' color={'white'} size={25} />

                    </TouchableOpacity>
                </View>
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
                            onPress={()=>setModalVisible(false)}
                                style={{
                                    position: 'absolute',
                                    top:10,
                                    right:10
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
                                    onSubmitEditing={handlePinSubmit}
                                    onChangeText={setPinCode}
                                    style={{
                                        width: '84%',
                                        borderWidth: 1,
                                        borderRightWidth: 0,
                                        paddingLeft: 5,
                                    }} keyboardType='number-pad' />
                                <TouchableOpacity onPress={handlePinSubmit} style={{
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
            </SafeAreaView>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 'auto',
        backgroundColor: '#26a541',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        height: 50
    },
    deliverToDiv: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 95,
        alignItems: 'left',
    },
    cartIcon: {
        flexDirection: 'row',
        position: 'relative'
    }
});