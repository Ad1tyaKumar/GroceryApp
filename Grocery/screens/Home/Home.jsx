import React, { useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Carousel1 from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import { Dimensions, Text, View, ScrollView, TouchableOpacity, Pressable, Animated, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productActions'
import Icon from '@expo/vector-icons/MaterialIcons';
import ProductCard from '../../components/Product/ProductCard';
import BottomNavigator from '../../components/Bottom/BottomNavigator';
import { useRoute } from '@react-navigation/native';
import CardSkeleton from '../../components/Product/CardSkeleton';
import { useSearch } from '../../components/SearchContext';
import MyHeader from '../../components/Header/MyHeader'
import HeaderAndBottom, { onMomentumScrollBegin, onMomentumScrollEnd, onScrollEndDrag } from '../../components/Animated/HeaderAndBottom';

const brandImg = new Map();
brandImg.set(
    "https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/brands/ithwagjjdcqxckmtw46t",
    "AMUL"
);
brandImg.set(
    "https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/brands/kvivjr469bjbgxldx1a4",
    "TATA"
);

brandImg.set(
    "https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/brands/b0st13z3nkyw1rj9dk0g",
    "SAFFOLA"
);
brandImg.set(
    "https://res.cloudinary.com/dmz2azdkb/image/upload/f_auto,q_auto/v1/brands/trmmgl6ravja1eao8amo",
    "AASHIRVAAD"
);
const brandImages = Array.from(brandImg.keys());

const categoryImg = [
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691691772_Super_Saver_Deals_on_Oil_Mobile.jpg?im=Resize=(756,376)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691347341_Blockbuster_Deals_On_Daily_Essentials_Mobile.jpg?im=Resize=(756,376)",
];

const CONTAINER_HEIGHT = 90;

const RenderItem = ({
    scrollRef,
    navigation,
    handleScroll,
    scrollRelativeToCurrent,
    setIndex,
    index,
    products,
    isCarousel,
    loading
}) => (
    <>
        <View style={{ position: 'relative', marginTop: CONTAINER_HEIGHT }}>

            {/* <Carousel
                enableSnap={true}
                layout={'default'}
                ref={isCarousel}
                // autoplay={true}
                loop={true}
                data={categoryImg}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width}
                onSnapToItem={index => setIndex(index)}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('products', { keyword: `&category=Staples` })}>
                        <Image style={{ height: 168, width: Dimensions.get('screen').width }} source={item} />
                    </TouchableOpacity>
                )} /> */}
            <Carousel1
                mode='parallax'
                data={categoryImg}
                loop
                ref={isCarousel}
                width={Dimensions.get('screen').width}
                height={Dimensions.get('screen').width / 2}
                // autoPlay={true}
                // scrollAnimationDuration={2000}
                onSnapToItem={index => setIndex(index)}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('products', { keyword: `&category=Staples` })}>
                        <Image style={{ height: 168, width: Dimensions.get('screen').width }} source={item} />
                    </TouchableOpacity>
                )}
            />
            <View
                style={{
                    position: 'absolute',
                    width: 100,
                    bottom: 0,
                    left: Dimensions.get('screen').width / 2 - 50,
                }}
            >
                <Pagination

                    dotsLength={categoryImg.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 18,
                        borderRadius: 5,
                        backgroundColor: 'black',
                        marginHorizontal: -5,
                        height: 6,
                    }}
                    tappableDots={false}
                    inactiveDotStyle={{
                        width: 6,
                        borderRadius: 5,
                        backgroundColor: 'black',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={1} />
            </View>
        </View>
        <View>
            <Text
                style={{
                    fontWeight: '600',
                    margin: 25,
                    marginTop: 0
                }}>
                Top Brands
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>


                <TouchableOpacity onPress={() => scrollRelativeToCurrent(-200)}>
                    {/* Scroll 100 units to the left */}
                    <Icon name={'chevron-left'} size={16} color="black" />
                    {/* <Text>H</Text> */}
                </TouchableOpacity>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={scrollRef}
                    onScroll={handleScroll}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        {brandImages.map((img, index) => (
                            <Pressable
                                onPress={() => navigation.navigate('products', { keyword: `&brand=${brandImg.get(img)}` })}
                                style={{
                                    margin: 10,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    borderColor: 'black'
                                }}
                                key={index}
                            >
                                <Image style={{
                                    width: 156,
                                    height: 120,
                                }} source={img} />
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => scrollRelativeToCurrent(200)}>
                    {/* Scroll 100 units to the right */}
                    <Icon name={'chevron-right'} size={16} color="black" />
                    {/* <Text>H</Text> */}
                </TouchableOpacity>
            </View>
        </View>
        <View
            style={{
                marginBottom: 50,
            }}>
            <Text
                style={{
                    fontWeight: '600',
                    margin: 25,
                }}>
                Top Products
            </Text>
            {loading ? <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                <CardSkeleton cards={4} />
            </View> :
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    {products && products.slice(0, 12).map((product, index) => (

                        <ProductCard product={product} key={index} />
                    ))}
                </View>}
        </View>
    </>
)

const Home = () => {

    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);
    const [index, setIndex] = useState(0);
    const [currentScrollX, setCurrentScrollX] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;
    const isCarousel = useRef(null);
    const scrollRef = useRef(null);
    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getProduct());
        }, [dispatch])
    );

    useEffect(() => {
        if (isCarousel.current) {
            setIndex(isCarousel.current.getCurrentIndex() % 2);
        }
        // console.log(isCarousel.current.getCurrentIndex())
    }, [isCarousel])

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        setCurrentScrollX(contentOffset.x);
    };
    const scrollToPosition = (xPosition) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ x: xPosition, animated: true });
        }
    };

    const scrollRelativeToCurrent = (offset) => {
        if (scrollRef.current) {
            const newX = currentScrollX + offset;
            scrollToPosition(newX);
        }
    };



    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}>
            <Animated.FlatList

                data={['']}
                keyExtractor={(item, index) => item.title + index.toString()}
                renderItem={({ item }) =>
                    <RenderItem
                        scrollRef={scrollRef}
                        navigation={navigation}
                        handleScroll={handleScroll}
                        scrollRelativeToCurrent={scrollRelativeToCurrent}
                        setIndex={setIndex}
                        index={index}
                        products={products}
                        isCarousel={isCarousel}
                        loading={loading}
                    />}
                // contentContainerStyle={styles.contentContainerStyle}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={() => onMomentumScrollEnd(offsetAnim)}
                onScrollEndDrag={() => onScrollEndDrag(offsetAnim)}
                scrollEventThrottle={1}
            />
            <HeaderAndBottom scrollY={scrollY} offsetAnim={offsetAnim} />
        </View>
    )
}

export default Home;