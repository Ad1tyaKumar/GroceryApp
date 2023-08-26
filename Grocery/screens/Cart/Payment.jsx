import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createOrder } from '../../actions/orderActions';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Payment = () => {

    const dispatch = useDispatch();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const [filterMethodNo, setFilterMethodNo] = useState(0);


    const cashOnDelivery = async () => {
        try {

            const item = await AsyncStorage.getItem('orderInfo');
            const orderInfo = JSON.parse(item);
            console.log();
            const data = {
                shippingInfo,
                orderItems: cartItems,
                paymentMethod: "Cash On Delivery",
                itemsPrice: orderInfo.subtotal,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: orderInfo.totalPrice,
            };
            console.log(data);
            dispatch(createOrder(data));
            Toast.show('ORDER PLACED!', { duration: Toast.durations.LONG });
        } catch (error) {
            Toast.show('Some Error Occurred!', { duration: Toast.durations.LONG });

        }
    };

    return (
        <View style={{
            margin: 10
        }}>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 30,
                }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                        margin: 10,
                    }}>
                    Amount Payable
                </Text>
                <View style={{
                    borderBottomWidth: 0.8,
                    borderColor: 'grey'
                }} />
                <View
                    style={{
                        margin: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                        }}>
                        {`₹${cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                        )}`}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'red',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        borderColor: 'black',
                        borderWidth: 1,
                        // backgroundColor:'red',
                        // justifyContent:'space-around',
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            width: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={() => setFilterMethodNo(0)}
                            disabled={filterMethodNo === 0}
                            style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 0 ? 'white' : 'lightgrey', borderTopLeftRadius: 15 }]}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    textAlign: 'center'
                                }}>
                                UPI
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderColor: 'lightgrey'
                            }}
                        />
                        <View
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderColor: 'grey'
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setFilterMethodNo(1)}
                            disabled={filterMethodNo === 1}
                            style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 1 ? 'white' : 'lightgrey' }]}>
                            <Text
                                style={{
                                    fontSize: 15,
                                }}>
                                NETBANKING
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderColor: 'lightgrey'
                            }}
                        />
                        <View
                            style={{
                                width: '100%',
                                borderBottomWidth: 1,
                                borderColor: 'grey'
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setFilterMethodNo(2)}
                            disabled={filterMethodNo === 2}
                            style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 2 ? 'white' : 'lightgrey', borderBottomLeftRadius: 15 }]}>
                            <Text
                                style={{
                                    fontSize: 15
                                }}>
                                Cash On Delivery
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        filterMethodNo === 0 ?
                            <View style={{
                                alignItems: 'center',
                                width: 210,
                            }}>
                                <Text style={{
                                    fontWeight: '600',
                                    fontSize: 20,
                                    marginTop: 20,
                                }}>
                                    UPI
                                </Text>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                />
                                <Text style={{
                                    color: 'red',
                                    marginTop: 10,
                                }}>Currently Unavailable</Text>
                            </View>
                            : filterMethodNo === 1 ? <View
                                style={{
                                    alignItems: 'center',
                                    width: 210
                                }}>
                                <Text style={{
                                    fontWeight: '600',
                                    fontSize: 20,
                                    marginTop: 20,
                                }}>
                                    NETBANKING
                                </Text>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                />
                                <Text style={{
                                    color: 'red',
                                    marginTop: 10,
                                }}>Currently Unavailable</Text>

                            </View> : <View
                                style={{
                                    alignItems: 'center',
                                    width: 210
                                }}>
                                <Text style={{
                                    fontWeight: '600',
                                    fontSize: 20,
                                    marginTop: 20,
                                }}>
                                    Cash On Delivery
                                </Text>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                />
                                <TouchableOpacity onPress={cashOnDelivery} style={{
                                    backgroundColor: '#26a541',
                                    padding: 5,
                                    marginTop: 50,
                                    borderRadius: 10,
                                }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize:15,
                                        }}>
                                        Pay {`₹${cartItems.reduce(
                                            (acc, item) => acc + item.quantity * item.price,
                                            0
                                        )}`} on Delivery
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    filterMethodsButton: {
        padding: 20,
        paddingRight: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        borderRightWidth: 1,
    },

})