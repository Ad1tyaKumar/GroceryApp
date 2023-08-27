import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import Header from '../../components/Header/Header';
import BottomNavigator from '../../components/Bottom/BottomNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductsByBrands } from '../../actions/productActions';
import Icon from '@expo/vector-icons/AntDesign'
import ProductCard from '../../components/Product/ProductCard';
import FilterBoxModal from './FilterBoxModal';
import CardSkeleton from '../../components/Product/CardSkeleton';
import { useSearch } from '../../components/SearchContext';

const Products = () => {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterMethodNo, setFilterMethodNo] = useState(0);
    const [filterCount, setFilterCount] = useState(0);
    const route = useRoute();

    const keyword = route.params.keyword;
    const [resetDrawer, setResetDrawer] = useState(false);
    const { products, loading, error, getBrands } = useSelector((state) => state.products)

    useFocusEffect(
        React.useCallback(() => {
            setResetDrawer(true);
            setScrollY(false);
        }, [])
    )

    useEffect(() => {
        console.log(keyword);
        dispatch(
            getProduct(keyword, currentPage, [0, 20000], "", "")
        );
    }, [dispatch, keyword, currentPage])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log(keyword);
    //         dispatch(
    //             getProduct(keyword, currentPage, [0, 20000], "", "")
    //         );
    //     }, [dispatch, keyword, currentPage])
    // );

    const getProductsByPrice = (brand, p, ratings = 0) => {
        dispatch(
            getProductsByBrands(keyword, currentPage, [p[0], p[1]], "", brand,
                getBrands, "", ratings)
        );
    };
    const clearFilter = (setBrands, getProductsByPrice, setTriggered) => {
        setBrands([]);
        getProductsByPrice([], [0, 20000], 0);
        setTriggered(false);
    }
    const [prevPositionY, setPrevPositionY] = useState(0);
    const { scrollY, setScrollY } = useSearch();


    return (
        <>

            <View
                style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height - 50
                }}>

                <ScrollView
                    onScroll={(event) => {
                        const { contentOffset } = event.nativeEvent;
                        setScrollY(prevPositionY <= contentOffset.y);
                        setResetDrawer(false);
                        setPrevPositionY(contentOffset.y);
                    }}
                    contentContainerStyle={{
                        alignItems: 'flex-end'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // borderWidth:1,
                            width: 245,
                            margin: 20,
                            marginBottom: 8,
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}>

                        <Text
                            style={{
                                fontSize: 20,
                                color: 'grey'
                            }}>Products</Text>

                        <TouchableOpacity
                            style={{
                                position: 'relative'
                            }}
                            onPress={() => setModalVisible(true)}>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}>
                                <Icon name='filter' size={16} />
                                Filter
                            </Text>
                            {
                                filterCount ?
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: -15,
                                            top: -6,
                                            padding: 1,
                                            width: 15,
                                            height: 15,
                                            backgroundColor: 'red',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 8
                                        }}>
                                        <Text
                                            style={{
                                                marginTop: -4,
                                                textAlign: 'center',
                                                color: 'white'
                                            }}>
                                            {filterCount}
                                        </Text>
                                    </View> : <></>
                            }
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: 50,
                        }}>

                        <View
                            style={{
                                borderBlockColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                width: '25%',
                                marginBottom: 20
                            }}>
                        </View>


                        {
                            loading ? <View style={{
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
                                    {
                                        products && products.length ? products.slice(0, 14).map((product, index) => (

                                            <ProductCard product={product} key={index} />

                                        )) : <Text>NO PRODUCTS</Text>
                                    }
                                </View>
                        }
                    </View>
                </ScrollView>
            </View>
            <FilterBoxModal getBrands={getBrands}
                getProductsByPrice={getProductsByPrice}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                filterMethodNo={filterMethodNo}
                setFilterMethodNo={setFilterMethodNo}
                setFilterCount={setFilterCount}
                clearFilter={clearFilter}
            />
            <BottomNavigator resetDrawer={resetDrawer} />
        </>
    )
}

export default Products

