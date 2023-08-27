import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, getItems, reomveItemsFromCart } from '../../actions/cartActions';
import Toast from 'react-native-root-toast';
import Icon from '@expo/vector-icons/AntDesign'
import { Image } from 'expo-image';
import BottomNavigator from '../../components/Bottom/BottomNavigator'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSearch } from '../../components/SearchContext';

const Cart = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { scrollY, setScrollY } = useSearch();
    const [prevPositionY, setPrevPositionY] = useState(0);

    const { isAuthenticated } = useSelector((state) => state.user);
    const { cartItems, loading } = useSelector((state) => state.cart);
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getItems());
        }
    }, [dispatch, isAuthenticated]);


    const decreaseQuantity = (id, q) => {
        if (1 >= q) {
            deletCartItems(id);
        } else {
            dispatch(addItemsToCart(id, q - 1));
        }
    };
    const [resetDrawer, setResetDrawer] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            setResetDrawer(true);
            setScrollY(false);
        }, [])
    )
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
        <>
            <ScrollView
                onScroll={(event) => {
                    const { contentOffset } = event.nativeEvent;
                    setScrollY(prevPositionY <= contentOffset.y);
                    setPrevPositionY(contentOffset.y);
                    setResetDrawer(false);
                }}
                style={{
                    width: '100%',
                    height: Dimensions.get('window').height
                }}>
                {


                    loading ? <Text>LOADING...</Text> :
                        <View style={styles.cartDiv}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '500',
                                    marginBottom: 10,
                                }}>My Cart ({cartItems.length} Items)</Text>
                            <View
                                style={{
                                    borderBottomWidth: 0.8,
                                    width: '100%',

                                }}
                            />
                            <View
                                style={styles.cartItems}>
                                {
                                    cartItems &&

                                    cartItems.map((item, index) => (
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                margin: 5,
                                                marginTop: 10,
                                                marginBottom: 10,

                                            }}
                                            key={index}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    marginBottom: 10,

                                                    // backgroundColor: 'white'
                                                }}>

                                                <Image
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        marginRight: 12,
                                                    }} source={`https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/products/${item.image.slice(item.image.indexOf("products/") + "products/".length, item.image.indexOf(".avif"))}`} />

                                                <View
                                                    style={{
                                                        width: '70%',
                                                        position: 'relative'
                                                    }}>
                                                    <Text style={{

                                                        marginBottom: 10
                                                    }} key={index}>
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: item.Stock < 1
                                                                ? "red"
                                                                : "green",
                                                            fontWeight: '500',
                                                            marginBottom: 10
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: 'black',

                                                            }}>
                                                            Status:
                                                        </Text>
                                                        {
                                                            item.Stock < 1 ? " OutOfStock"
                                                                : " InStock"
                                                        }
                                                    </Text>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            width: '87%',
                                                            position: 'absolute',
                                                            bottom: 0
                                                        }}>
                                                        <Text
                                                            style={{
                                                                fontWeight: '500'
                                                            }}>
                                                            ₹{item.price}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                width: 70,
                                                                justifyContent: "space-between"
                                                            }}>
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    decreaseQuantity(item.product, item.quantity)
                                                                }
                                                                style={styles.quantityButton}>
                                                                <Icon name='minus' size={18} color={'black'} />
                                                            </TouchableOpacity>
                                                            <Text>
                                                                {item.quantity}
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() =>
                                                                    increaseQuantity(
                                                                        item.product,
                                                                        item.quantity,
                                                                        item.stock
                                                                    )
                                                                }
                                                                style={styles.quantityButton}>
                                                                <Icon name='plus' size={18} color={'black'} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomWidth: 1,
                                                    width: '100%',
                                                    borderColor: 'lightgrey'

                                                }}

                                            />
                                        </View>
                                    ))
                                }
                            </View>
                            <View
                                style={styles.paymentDetails}
                            >
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 25,
                                        margin: 20,
                                        marginBottom: 30,
                                    }}>
                                    Payment Details
                                </Text>
                                <View
                                    style={styles.paymentPrice}>
                                    <Text>
                                        MRP Total
                                    </Text>
                                    <Text>
                                        {`₹${cartItems.reduce(
                                            (total, curr) => total + curr.price * curr.quantity,
                                            0
                                        )}`}
                                    </Text>
                                </View>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderColor: 'lightgrey',
                                    width: '100%',
                                    marginTop: 10,
                                    marginBottom: 10,
                                }} />
                                <View
                                    style={styles.paymentPrice}>
                                    <Text>
                                        Delivery Fee
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '600'
                                        }}>
                                        {`Free`}
                                    </Text>
                                </View>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderColor: 'lightgrey',
                                    width: '100%',
                                    marginTop: 10,
                                    marginBottom: 10,
                                }} />
                                <View
                                    style={styles.paymentPrice}>
                                    <Text>
                                        Total
                                    </Text>
                                    <Text>
                                        {`₹${cartItems.reduce(
                                            (total, curr) => total + curr.price * curr.quantity,
                                            0
                                        )}`}
                                    </Text>
                                </View>
                            </View>

                        </View>
                }
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: resetDrawer?50:!scrollY?0:50,
                    height: 50,
                    backgroundColor: 'grey',
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: "space-around"
                }}>
                <Text
                    style={{
                        fontWeight: '500',
                        color: 'white'
                    }}>
                    MRP TOTAL: {` ₹${cartItems.reduce(
                        (total, curr) => total + curr.price * curr.quantity,
                        0
                    )}`}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('order')}
                    activeOpacity={0.6}
                    style={{
                        height: 35,
                        width: 100,
                        borderRadius: 15,
                        elevation: 4,

                        backgroundColor: '#26a541',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '500'
                        }}>
                        Place Order
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomNavigator  resetDrawer={resetDrawer}/>
        </>
    )
}

export default Cart

const styles = StyleSheet.create({
    cartDiv: {
        marginTop: 20,
        alignItems: 'center',
    },
    quantityButton: {
        elevation: 5,
        justifyContent: 'center',
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        width: 20
    },
    paymentDetails: {
        borderWidth: 0.8,
        width: 300,
        height: 210,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 100,

    },
    paymentPrice: {
        justifyContent: 'space-around',
        width: '100%',
        flexDirection: 'row'
    }
})