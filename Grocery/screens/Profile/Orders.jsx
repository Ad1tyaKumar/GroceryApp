import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import BottomNavigator from '../../components/Bottom/BottomNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { saveOrder } from '../../actions/orderActions'
import { Image } from 'expo-image'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/MaterialIcons';
import { getItems } from '../../actions/cartActions'


const Orders = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { loading, isAuthenticated, error, user } = useSelector(
        (state) => state.user
    );
    let orders = useSelector((state) => state.order.orders);
    const { loading: ordersLoading } = useSelector((state) => state.order);

    useFocusEffect(
        React.useCallback(() => {
            if (isAuthenticated) {
                dispatch(getItems());
            }
        }, [dispatch, isAuthenticated])
    );
    useFocusEffect(
        React.useCallback(() => {
            dispatch(saveOrder());
        }, [dispatch])
    )


    return (
        <>
            {
                (loading || ordersLoading) ? <ActivityIndicator size={50} /> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            margin: 10,
                        }}>
                        <Text
                            style={{
                                fontWeight: '500',
                                fontSize: 25,
                            }}>Your Orders</Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 50,
                            }}>
                            {
                                orders && orders.slice()
                                    .reverse().map((item, index) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('order-details', { order: item })} key={index}
                                            activeOpacity={0.7}
                                            style={{
                                                borderWidth: 1,
                                                width: '100%',
                                                margin: 10,
                                                borderRadius: 15,
                                                height: 120,
                                                backgroundColor: 'white'
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    margin: 5,
                                                }}>

                                                {
                                                    item.orderItems.slice(0, 3).map((product, index) => (
                                                        <Image
                                                            key={index}
                                                            style={{
                                                                height: 60,
                                                                width: 60,
                                                                margin: 10
                                                            }} source={`https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/products/${product.image.slice(product.image.indexOf("products/") + "products/".length, product.image.indexOf(".avif"))}`} />
                                                    ))
                                                }
                                                {
                                                    item.orderItems.length - 3 > 0 ?
                                                        <View
                                                            style={{
                                                                height: 50,
                                                                width: 50,
                                                                borderRadius: 25,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                elevation: 3,
                                                                backgroundColor: '#fff',
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 20,

                                                                }}>
                                                                +{item.orderItems.length - 3}
                                                            </Text>
                                                        </View>
                                                        : <></>
                                                }
                                                <Icon style={{
                                                    position: 'absolute',
                                                    right: 5,
                                                }} name={"chevron-right"} size={30} color="black" />
                                            </View>
                                            <View
                                                style={{
                                                    marginLeft: 5,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    width: 220,
                                                    position: 'absolute',
                                                    bottom: 10
                                                }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    fontWeight: '500',
                                                    color: item.orderStatus.slice(0, 1) === "D" ? 'green' : (item.orderStatus.slice(0, 1) === "S" ? 'red' : 'grey')
                                                }}>{item.orderStatus}</Text>
                                                <Text style={{
                                                    fontSize: 15,
                                                    fontWeight: '500'
                                                }}>Order Price: ₹{item.totalPrice}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    ))
                            }
                        </View>
                    </ScrollView >
            }
            <BottomNavigator />
        </>
    )
}

export default Orders