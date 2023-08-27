import { View, Text, Dimensions, FlatList, Animated, ScrollView, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct, getProductDetails, getRelatedProducts, newReview } from '../../actions/productActions';
import { Image } from 'expo-image';
import Pagination from './Pagination'
import Icon from '@expo/vector-icons/Ionicons';
import Stars from 'react-native-stars';
import Icon1 from '@expo/vector-icons/AntDesign';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/Product/ProductCard';
import ReviewCard from './ReviewCard';
import BottomNavigator from '../../components/Bottom/BottomNavigator';
import CardSkeleton from '../../components/Product/CardSkeleton';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import { useSearch } from '../../components/SearchContext';
import { addItemsToCart } from '../../actions/cartActions';
import Toast from 'react-native-root-toast';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0)
    const dispatch = useDispatch();
    const [prevPositionY, setPrevPositionY] = useState(0);
    const [resetDrawer, setResetDrawer] = useState(false);
    const { scrollY, setScrollY } = useSearch();
    useFocusEffect(
        React.useCallback(() => {
            setResetDrawer(true);
            setScrollY(false);
        }, [])
    )

    const isCarousel = useRef(null);
    const route = useRoute();
    const id = route.params.id;
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { products, loading: loading1 } = useSelector((state) => state.relatedProducts)
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    useEffect(() => {
        if (product && product.subCategory) {
            dispatch(getRelatedProducts(product.subCategory));
        }
    }, [dispatch, product])
    const [quantity, setQuantity] = useState(1);
    const changeQuantity = (q) => {
        if (q <= 0) return;
        else if (q > product.Stock) return;
        setQuantity(q);
    }
    const handleOnScroll = event => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX
                    }
                }
            }
        ],
            {
                useNativeDriver: false,
            }
        )(event);
    }
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getProductDetails(id));
        }, [dispatch, id])
    )
    useEffect(() => {
        if (reviewError) {
            Toast.show(reviewError, { duration: Toast.durations.SHORT });
            dispatch(clearErrors());
        }
        if (success) {
            Toast.show("Review Submitted Successfully!", { duration: Toast.durations.SHORT });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, success, reviewError])
    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index)
    }).current;
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;
    const flatListRef = useRef(null);

    const handleDotPress = (selectedIndex) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: selectedIndex });
        }
    };
    const reviewSubmitHandler = () => {
        const myForm = {
            rating, comment, productId: id,
        };
        dispatch(newReview(myForm));
        setModalVisible(false);
    };
    const Divider = () => {
        return (
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        )
    }
    return (
        <>

            <View
                style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height - 50
                }}>
                {
                    (loading || loading1) ? <ProductDetailsSkeleton /> :
                        <ScrollView
                            onScroll={(event) => {
                                const { contentOffset } = event.nativeEvent;
                                setScrollY(prevPositionY <= contentOffset.y);
                                setPrevPositionY(contentOffset.y);
                                setResetDrawer(false);
                            }}
                            contentContainerStyle={{ alignItems: 'center' }}
                            style={{
                                height: Dimensions.get('screen').height / 1.3,
                            }}
                        >

                            <View
                                style={{
                                    marginTop: 40,
                                    height: 300,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    borderBottomColor: 'black',
                                    position: 'relative',
                                    width: '70%'
                                }}>
                                <FlatList
                                    ref={flatListRef}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    decelerationRate={0}
                                    snapToInterval={250} //your element width
                                    snapToAlignment={"center"}
                                    horizontal={true}
                                    style={{
                                        width: 250,
                                    }}
                                    onScroll={handleOnScroll}
                                    data={product.images}
                                    onViewableItemsChanged={handleOnViewableItemsChanged}
                                    viewabilityConfig={viewabilityConfig}
                                    renderItem={({ item, index }) => (

                                        <View style={{
                                            // backgroundColor: 'red',
                                            height: 250,
                                        }}>
                                            <Image style={{ height: 250, width: 250, marginTop: 10 }} source={
                                                `https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/products/${item.public_id.split('/')[1]}`
                                            } />
                                        </View>
                                    )} />
                                <View
                                    style={{
                                        backgroundColor: 'red',
                                        width: '100%',
                                        position: 'absolute',
                                        bottom: -15
                                    }}>
                                    {
                                        product.images &&
                                        <Pagination data={product.images} scrollX={scrollX} index={index} onDotPress={handleDotPress} />
                                    }
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '80%',
                                    marginBottom: 20
                                }}>
                                <Text
                                    style={styles.productDetailsText}
                                >{product.name}</Text>
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        marginTop: 15,
                                        fontSize: 12
                                    }}>
                                    Brand: <Text style={{
                                        color: 'green',
                                        fontWeight: '600'
                                    }}>{product.brand}</Text>
                                </Text>
                                <Text
                                    style={[styles.productDetailsText, { fontSize: 20 }]}>
                                    ₹{product.price}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 15
                                    }}>
                                    <Stars
                                        disabled={true}
                                        spacing={3}
                                        fullStar={<Icon name='star-sharp' size={20} color={'tomato'} />}
                                        halfStar={<Icon name='star-half-sharp' size={20} color={'tomato'} />}
                                        emptyStar={<Icon name='star-outline' size={20} color={'tomato'} />}
                                        half={true}
                                        count={5}
                                        default={product.ratings}
                                    />

                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontSize: 12,
                                            marginLeft: 5
                                        }}>
                                        ({product.reviews && product.reviews.length} Reviews)
                                    </Text>
                                </View>
                                <Text style={{ marginTop: 15, marginBottom: 20, fontSize: 12 }}>
                                    Status:
                                    <Text style={{
                                        color: product.Stock > 0 ? 'green' : 'red',
                                        fontWeight: '600'
                                    }}>
                                        {product.Stock > 0 ? ' In Stock' : " Out Of Stock"}
                                    </Text>
                                </Text>
                                <Divider />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        marginBottom: 20
                                    }}>
                                    <TouchableOpacity
                                        activeOpacity={0.4}
                                        style={styles.quantityButton}
                                        onPress={() => changeQuantity(quantity - 1)}>

                                        <Icon1 name='minus' color={'black'} size={20} />

                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginLeft: 8,
                                            marginRight: 8
                                        }}>
                                        {quantity}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.4}
                                        style={styles.quantityButton}
                                        onPress={() => changeQuantity(quantity + 1)}>
                                        <Icon1 name='plus' color={'black'} size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(addItemsToCart(id, quantity))
                                            Toast.show("Added to Cart", { duration: Toast.durations.SHORT })
                                        }}
                                        style={styles.addToCartButton}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={{
                                                color: 'white'
                                            }}>
                                            Add To Cart
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Divider />
                                <View
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginTop: 20
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: '600',
                                            marginBottom: 8

                                        }}>
                                        Deliver To :-
                                    </Text>
                                    <Text>
                                        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat fugit minus atque, ex nemo accusantium eveniet autem sit sapiente, impedit e corporis`}
                                    </Text>
                                    <Text>
                                        State: {`JH`}
                                    </Text>
                                    <Text>
                                        City: {`Ranchi`}
                                    </Text>
                                    <Text>
                                        PinCode: {`834010`}
                                    </Text>
                                    <Text>
                                        Phone Number: {`+91 6202726243`}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    alignItems: 'left',
                                    width: '100%'
                                }}>
                                <Divider />

                                <Text
                                    style={{
                                        margin: 20,
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>
                                    Product Description
                                </Text>
                                <Text style={{
                                    margin: 20,
                                    marginTop: 0,
                                    marginBottom: 25
                                }}>
                                    {product.description}
                                </Text>
                                <Divider />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                }}>
                                <Text
                                    style={{
                                        margin: 20,
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>
                                    Related Products
                                </Text>
                                {
                                    loading1 ? <FlatList
                                        horizontal={true}
                                        style={{
                                            marginBottom: 20
                                        }}
                                        data={[1]}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <CardSkeleton cards={3} />
                                            )

                                        }}
                                    /> :
                                        products.filter((p) => p._id !== product._id).length ?
                                            <FlatList
                                                horizontal={true}
                                                style={{
                                                    marginBottom: 20
                                                }}
                                                data={products.filter((p) => p._id !== product._id)}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <ProductCard product={item} key={index} />
                                                    )
                                                }}
                                            /> : <>
                                                <Text
                                                    style={{
                                                        margin: 20,
                                                        marginTop: 0
                                                    }}>
                                                    NO PRODUCTS
                                                </Text>
                                            </>
                                }
                                <Divider />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>
                                    Reviews
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setModalVisible(true)}
                                    style={{
                                        backgroundColor: 'tomato',
                                        height: 30,
                                        width: 130,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: 50,
                                        borderRadius: 5
                                    }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: '500'
                                        }}>
                                        Submit a Review
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                horizontal={true}
                                style={{
                                    marginBottom: 50,
                                }}
                                showsHorizontalScrollIndicator={false}
                                data={product.reviews}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ReviewCard review={item} key={item._id} />
                                    )
                                }}
                            />
                            <Modal
                                animationType='fade'
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',

                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                            padding: 20,
                                            width: 350,
                                            height: 400,
                                            borderColor: 'lightgrey',
                                            borderWidth: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18
                                            }}>
                                            Submit a review
                                        </Text>
                                        <View
                                            style={{
                                                padding: 10,
                                                paddingBottom: 0
                                            }}>
                                            <Stars
                                                spacing={3}
                                                update={setRating}
                                                fullStar={<Icon name='star-sharp' size={30} color={'tomato'} />}
                                                halfStar={<Icon name='star-half-sharp' size={30} color={'tomato'} />}
                                                emptyStar={<Icon name='star-outline' size={30} color={'tomato'} />}
                                                count={5}
                                                default={rating}
                                            />
                                        </View>
                                        <TextInput
                                            onChangeText={setComment}
                                            value={comment}
                                            multiline={true}
                                            numberOfLines={8}
                                            cursorColor={'black'}
                                            style={{
                                                width: 300,
                                                fontSize: 15,
                                                marginTop: 15,
                                                textAlignVertical: 'top',
                                                backgroundColor: 'lightgrey',
                                                borderRadius: 5,
                                                padding: 10,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                color: comment.length > 250 ? 'red' : 'black',
                                                width: 300
                                            }}>
                                            ({comment.length}/250)
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 20,
                                                width: 300,
                                                justifyContent: 'space-around'
                                            }}>
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                style={[styles.modalActionsButtons]}
                                                onPress={() => setModalVisible(!modalVisible)}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        textAlign: 'center'
                                                    }}>
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                onPress={reviewSubmitHandler}
                                                disabled={comment.length > 250}
                                                style={[styles.modalActionsButtons, { opacity: (comment.length > 250 || !rating) ? 0.6 : 1 }]}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        textAlign: 'center',
                                                    }}>
                                                    Submit
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                }
            </View>
            <BottomNavigator resetDrawer={resetDrawer} />
        </>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    productDetailsText: {
        marginTop: 15,
        fontWeight: '500',
    },
    quantityButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addToCartButton: {
        backgroundColor: '#26a541',
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 5,
    },
    modalActionsButtons: {
        fontSize: 10,
        backgroundColor: 'tomato',
        padding: 8,
        width: 70,

    }
})