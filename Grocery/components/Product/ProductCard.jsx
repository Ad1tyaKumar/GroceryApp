import { View, Text, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import Icon from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import { addItemsToCart, reomveItemsFromCart } from '../../actions/cartActions'



const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const { cartItems, loading } = useSelector((state) => state.cart);
    const { loading: loading1, isAuthenticated } = useSelector((state) => state.user)
    const navigation = useNavigation();


    const decreaseQuantity = (id, q) => {
        if (1 >= q) {
            deletCartItems(id);
        } else {
            dispatch(addItemsToCart(id, q - 1));
        }
    };
    const increaseQuantity = (id, q, stock) => {
        if (stock <= q) {
            Toast.show('Cannot Add more Items!', { duration: Toast.durations.SHORT, backgroundColor: 'red', shadowColor: 'black', position: -100 })
            return;
        }
        dispatch(addItemsToCart(id, q + 1));
    };
    // console.log(cartItems);
    const deletCartItems = (id) => {
        dispatch(reomveItemsFromCart(id));
    };

    return (
        <Pressable style={styles.productContainer}
            onPress={() => navigation.navigate('product-details', { id: product._id })}
        >
            <Image style={{ height: 140, width: 140, marginTop: 15, marginLeft: 10 }} source={
                `https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/products/${product.images[0].public_id.split('/')[1]}`
            } />
            <Text
                style={{
                    fontSize: 13,
                    marginTop: 10,
                    marginLeft: 7,
                    textAlign: 'left',
                    height: 30,
                    fontWeight: 500
                }}>
                {product.name.length > 30 ? `${product.name.slice(0, 27)}...` : product.name}
            </Text>
            <Text
                style={{
                    fontSize: 15,
                    marginTop: 5,
                    fontWeight: '500',
                    marginLeft: 7,
                }}>
                ₹{product.price}
            </Text>
            {
                (loading || loading1) ? <ActivityIndicator /> :
                    cartItems && cartItems.find((item) => item.product === product._id) ? <View
                        style={{
                            flexDirection: 'row',
                            width: 80,
                            justifyContent: 'space-around',
                            marginTop: 10,
                            marginLeft: 53,
                            alignItems: 'center'
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() =>
                                decreaseQuantity(product._id, cartItems.find((item) => item.product === product._id).quantity)
                            }>
                            <Icon name='minuscircle' color={'#26a541'} size={27} />
                        </TouchableOpacity>
                        <Text>
                            {cartItems && cartItems.find((item) => item.product === product._id).quantity}
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                increaseQuantity(
                                    product._id,
                                    cartItems.find((item) => item.product === product._id).quantity,
                                    product.Stock
                                )
                            }
                            activeOpacity={0.6}>
                            <Icon name='pluscircle' color={'#26a541'} size={27} />
                        </TouchableOpacity>
                    </View> :
                        <TouchableOpacity
                            onPress={() => {
                                if (isAuthenticated) {
                                    if (product.Stock < 1) {
                                        Toast.show('OTP Sent Successfully!', { duration: Toast.durations.SHORT, backgroundColor: '#26a541', shadowColor: 'black', position: -100 })
                                        return;
                                    }
                                    dispatch(addItemsToCart(product._id, 1, product.Stock));
                                } else {
                                    Toast.show('OTP Sent Successfully!', { duration: Toast.durations.SHORT, backgroundColor: 'red', shadowColor: 'black', position: -100 })
                                }
                            }}
                            activeOpacity={0.6}
                            style={styles.addContainer}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    fontSize: 15
                                }}>
                                Add
                            </Text>
                            <Icon name='plus' size={20} color={'white'} />
                        </TouchableOpacity>
            }
        </Pressable>
    )
}

export default ProductCard
const styles = StyleSheet.create({
    productContainer: {
        height: 270,
        width: 160,
        // backgroundColor:'red',
        // alignItems:'center',
        borderColor: 'black',
        elevation: 3,
        borderRadius: 3,
        margin: 5,
        // flex:1
    },
    addContainer: {
        backgroundColor: '#26a541',
        width: 140,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        marginLeft: 10,
    }
})