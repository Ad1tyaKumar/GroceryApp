import { View, Button, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar, StyleSheet, TextInput, ActivityIndicator, Modal, Pressable, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import Icon from '@expo/vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/core';
import { useSearch } from '../SearchContext';
import { useFocusEffect , useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addPinCode, getPin, getUser } from '../../actions/userActions';
import { getItems } from '../../actions/cartActions';
import { useRef } from 'react';
import Model from './Model';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
    const { searchInput, setSearchInput, scrollY } = useSearch();

    // const [keyword, setKeyword] = useState(searchInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [clicked, setClicked] = useState(false);
    const { pinCode, loading } = useSelector((state) => state.pinCode);
    const [invalid, setInvalid] = useState(false);
    const [pincode, setPinCode] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    // const [cartItems, setCartItems] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);

    const handleSearch = () => {
        setClicked(!clicked);
        navigation.navigate('products', { keyword: searchInput, clicked })
    }
    const { loading: loading1, shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user, isAuthenticated } = useSelector((state) => state.user);

    // useEffect(() => {
    //     (async () => {
    //         const cartString = await AsyncStorage.getItem("cartItems");
    //         setCartItems(JSON.parse(cartString));
    //         setCartLoading(false);
    //     })()
    // }, [loading1, cartItemsState])

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(getUser());
        }
        dispatch(getPin());

    }, [dispatch, isAuthenticated]);

    useFocusEffect(
        React.useCallback(() => {
            // console.log(isAuthenticated, user);
            if (isAuthenticated) {
                // console.log(shippingInfo);
                dispatch(getItems());
            }
        }, [dispatch, isAuthenticated])
    );

    useFocusEffect(
        React.useCallback(() => {
            setPinCode(pinCode);
        }, [pinCode])
    )


    const handlePinSubmit = (e) => {
        setInvalid(false);
        if (pincode.toString().length === 6) {
            dispatch(addPinCode(pincode));
            setModalVisible(false);
        } else {
            setInvalid(true);
        }
    };

    return (
        <SafeAreaView>
            <View style={{
                height : 'auto',
                backgroundColor: 'lightgreen'
            }}>
                <View style={styles.nav} >
                    <Icon name="menu" size={30} color="black" onPress={() => {
                        navigation.toggleDrawer()
                    }} />
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
                        disabled={cartLoading}
                        onPress={() => isAuthenticated ? navigation.navigate('cart') : navigation.navigate("signin")}
                        style={styles.cartIcon}>

                        <Icon name="shopping-cart" size={30} color="white" />
                        {/* <Text>H</Text> */}
                        {
                            cartLoading ?
                                <ActivityIndicator /> :
                                isAuthenticated ?
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
                                    </Text> : <></>
                        }
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height: 40,
                        width: '100%',
                        // transform: [{ scaleY: interpolatedHeight }]
                    }}>
                    <TextInput
                        onChangeText={setSearchInput}
                        value={searchInput}
                        onSubmitEditing={handleSearch}
                        placeholder='Search'
                        cursorColor={'black'} style={{
                            // height: 30,
                            fontSize: 15,
                            width: 250,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderRightWidth: 0,
                            paddingLeft: 5,
                            borderColor: 'grey',
                            backgroundColor: 'white',
                            elevation: 15,
                        }} />
                    <TouchableOpacity
                        onPress={handleSearch}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: '#26a541',
                            width: 25,
                            // height: 30,
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
                <Model pincode={pincode} setPinCode={setPinCode} invalid={invalid} modalVisible={modalVisible} setModalVisible={setModalVisible} handlePinSubmit={handlePinSubmit} />
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 'auto',
        backgroundColor: '#26a541',
        alignItems: 'center',
        height: 60
    },
    deliverToDiv: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'left',
    },
    cartIcon: {
        flexDirection: 'row',
        position: 'relative'
    }
});