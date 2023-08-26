import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import BottomNavigator from '../../components/Bottom/BottomNavigator';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';

const OrderDetails = () => {

    const route = useRoute();

    const { user, isAuthenticated, loading, error } = useSelector((state) => state.user);

    const order = route.params.order;
    const address = `${order.shippingInfo.address}, ${order.shippingInfo.city
        }, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode
        }, ${`India`}`;
    const navigation = useNavigation();
    return (
        <>
            {
                loading ? <ActivityIndicator size={50} /> :
                    <ScrollView>
                        <View
                            style={{
                                margin: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: '500',
                                    fontSize: 25,
                                }}>
                                Order Details
                            </Text>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginTop: 30,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '500',
                                        margin: 10,
                                    }}>
                                    Delivery Address
                                </Text>
                                <View style={{
                                    borderBottomWidth: 0.8,
                                    borderColor: 'grey'
                                }} />
                                <View
                                    style={{
                                        margin: 10,
                                    }}>
                                    <Text style={styles.addressText}>{user.name}</Text>
                                    <Text style={styles.addressText}>{address}</Text>
                                    <Text style={styles.addressText}>+91 {order.shippingInfo.phoneNo}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    marginTop: 30,
                                    marginBottom: 30,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '500',
                                        margin: 10,
                                    }}>
                                    Your Cart Items
                                </Text>
                                <View style={{
                                    borderBottomWidth: 0.8,
                                    borderColor: 'grey'
                                }} />
                                {
                                    order.orderItems.map((product, index) => (
                                        <Pressable style={{
                                            backgroundColor: 'white', margin: 5,
                                        }} onPress={() => navigation.navigate('product-details', { id: product.product })} key={index}>

                                            <View style={{
                                                flexDirection: 'row',
                                                margin: 10,
                                                alignItems: 'center'
                                            }}>
                                                <Image style={{
                                                    height: 60,
                                                    width: 60,
                                                }} source={`https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/products/${product.image.slice(product.image.indexOf("products/") + "products/".length, product.image.indexOf(".avif"))}`} />
                                                <Text

                                                    style={{
                                                        fontSize: 13,
                                                        width: 250,
                                                        marginLeft: 10
                                                    }}>{product.name}</Text>
                                                <Text
                                                    style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        bottom: 0,
                                                        fontSize: 13,
                                                    }}> {`₹${product.price} X ${product.quantity}`}</Text>

                                            </View>
                                            {
                                                index < order.orderItems.length - 1 ?
                                                    <View style={{
                                                        borderColor: 'grey',
                                                        borderBottomWidth: 1,
                                                    }} /> : <></>
                                            }
                                        </Pressable>
                                    ))
                                }
                            </View>
                            <View
                                style={{
                                    marginBottom: 50,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '500',
                                        margin: 10,
                                    }}>
                                    {`Payment Details`}
                                </Text>
                                <View style={{
                                    borderBottomWidth: 0.8,
                                    borderColor: 'grey'
                                }} />
                                <View style={{
                                    margin: 10,
                                    alignItems: 'center'
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: '80%'
                                        }}>
                                        <Text>
                                            Subtotal
                                        </Text>
                                        <Text style={{
                                            marginLeft: 10,
                                        }}>₹{order.totalPrice}</Text>
                                    </View>
                                    <View style={{
                                        borderBottomWidth: 0.8,
                                        borderColor: 'grey',
                                        width: '70%',
                                        margin: 12,
                                    }} />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: '80%'
                                        }}>
                                        <Text>
                                            Delivery
                                        </Text>
                                        <Text style={{
                                            marginLeft: 10,
                                        }}>₹{0}</Text>
                                    </View>
                                    <View style={{
                                        borderBottomWidth: 0.8,
                                        borderColor: 'grey',
                                        width: '70%',
                                        margin: 12,
                                    }} />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: '80%'
                                        }}>
                                        <Text>
                                            Total
                                        </Text>
                                        <Text style={{
                                            marginLeft: 10,
                                        }}>₹{order.totalPrice}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            }
            <BottomNavigator />
        </>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    addressText: {
        fontSize: 13,
        marginTop: 5,
        marginBottom: 5,
    }
})