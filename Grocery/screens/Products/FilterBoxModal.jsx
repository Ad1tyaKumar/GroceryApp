import { View, Text, StyleSheet, Modal, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from 'react-native-check-box'
import { FontAwesome } from '@expo/vector-icons';
import { getProductsByBrands } from '../../actions/productActions';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';



const FilterBoxModal = ({
    getBrands,
    getProductsByPrice,
    modalVisible,
    setModalVisible,
    filterMethodNo,
    setFilterMethodNo,
    setFilterCount,
    clearFilter
}) => {
    let count = 0;
    const route = useRoute();
    const dispatch = useDispatch();
    const keyword = route.params.keyword;
    const clicked=route.params.clicked;
    const [brands, setBrands] = useState([]);
    const [circleChecked, setCircleChecked] = useState([false, false, false, false, false, false])
    const [circleChecked1, setCircleChecked1] = useState([false, false, false, false, false, false])
    const [maxPrice, setMaxPrice] = useState(20000);
    const [minPrice, setMinPrice] = useState(0);
    const [triggered, setTriggered] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setMaxPrice(20000);
        setMinPrice(0);
        setCircleChecked([false, false, false, false, false, false])
        setCircleChecked1([false, false, false, false, false, false])
        clearFilter(setBrands, getProductsByPrice, setTriggered);
    }, [clicked])
    // useFocusEffect(
    //     React.useCallback(() => {
    //         setMaxPrice(20000);
    //         setMinPrice(0);
    //         setCircleChecked([false, false, false, false, false, false])
    //         setCircleChecked1([false, false, false, false, false, false])
    //         clearFilter(setBrands, getProductsByPrice, setTriggered);
    //     }, [])
    // );

    useEffect(() => {
        count = 0;
        circleChecked.forEach((ele) => {
            if (ele) {
                count++;
            }
        })
        circleChecked1.forEach((ele) => {
            if (ele) {
                count++;
            }
        })
        if (triggered) {
            count++;
        }
        if (brands.length) {
            count++;
        }
        setFilterCount(count)
    }, [circleChecked1, circleChecked, triggered, brands.length])

    const handleCheckboxChange = (p) => {
        let brand = brands;
        const isChecked = brand.find((val) => val === p) ? true : false;
        if (!isChecked) {
            brand.push(p);
            console.log(brand.length);
        } else {
            brand = brand.filter((item) => item !== p);
        }
        let rating;
        circleChecked1.forEach((ele, index) => {
            if (ele) {
                rating = index;
            }
        })
        setBrands(brand);
        getProductsByPrice(brand, [minPrice, maxPrice], rating);
    };

    const CircularCheckbox = ({ label, onChange, checked }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <FontAwesome name={checked ? 'dot-circle-o' : 'circle-o'} size={20} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 16 }}>{label}</Text>
            </View>
        );
    };

    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <Pressable
                    // onPress={() => setModalVisible(false)}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {/* <TouchableWithoutFeedback> */}


                    <View
                        style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderRadius: 10,
                            padding: 20,
                            paddingTop: 0,
                            paddingBottom: 0,
                            width: 350,
                            height: 400,
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontSize: 18
                                }}>
                                Filter Products
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderColor: 'black'
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: 350,
                                height: 300,
                                // backgroundColor:'red',
                                // justifyContent:'space-around',
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    borderRightWidth: 1,
                                    borderColor: 'black',
                                    width: 150,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'black',
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setFilterMethodNo(0)}
                                    disabled={filterMethodNo === 0}
                                    style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 0 ? 'white' : 'lightgrey' }]}>
                                    <Text
                                        style={{
                                            fontSize: 15
                                        }}>
                                        Filter By Brands
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'black'
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setFilterMethodNo(1)}
                                    disabled={filterMethodNo === 1}
                                    style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 1 ? 'white' : 'lightgrey' }]}>
                                    <Text
                                        style={{
                                            fontSize: 15
                                        }}>
                                        Filter By Price
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'black'
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setFilterMethodNo(2)}
                                    disabled={filterMethodNo === 2}
                                    style={[styles.filterMethodsButton, { backgroundColor: filterMethodNo === 2 ? 'white' : 'lightgrey' }]}>
                                    <Text
                                        style={{
                                            fontSize: 15
                                        }}>
                                        Filter By Ratings
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        width: '100%',
                                        borderBottomWidth: 1,
                                        borderColor: 'black'
                                    }}
                                />
                            </View>
                            {
                                filterMethodNo === 0 ?
                                    getBrands && getBrands.length ?
                                        <FlatList
                                            contentContainerStyle={{
                                                alignItems: 'center',
                                                width: 200,
                                                justifyContent: 'center'
                                            }}
                                            data={getBrands}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <>
                                                        <View key={index}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                width: 150,
                                                                justifyContent: 'flex-start'
                                                            }}>
                                                            <CheckBox
                                                                isChecked={
                                                                    brands.find((val) => val === item) ? true : false
                                                                }
                                                                onClick={() => handleCheckboxChange(item)} />
                                                            <Text style={styles.brands} >
                                                                {item}
                                                            </Text>
                                                        </View>
                                                    </>
                                                )
                                            }}
                                        /> : <Text>PLEASE WAIT...</Text> : filterMethodNo === 1 ? <View
                                            style={{
                                                alignItems: 'flex-start',
                                                marginLeft: 10,
                                                width: 190
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([true, false, false, false, false, false])
                                                    setMinPrice(0);
                                                    setMaxPrice(100);
                                                    getProductsByPrice(brands, [0, 100], rating);
                                                }}>
                                                <CircularCheckbox label={'₹0 - 100'} checked={circleChecked[0]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([false, true, false, false, false, false])
                                                    setMinPrice(100);
                                                    setMaxPrice(200);
                                                    getProductsByPrice(brands, [100, 200], rating);
                                                }}
                                            >
                                                <CircularCheckbox label={'₹100 - 200'} checked={circleChecked[1]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([false, false, true, false, false, false])
                                                    setMinPrice(200);
                                                    setMaxPrice(300);
                                                    getProductsByPrice(brands, [200, 300], rating);
                                                }}
                                            >
                                                <CircularCheckbox label={'₹200 - 300'} checked={circleChecked[2]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([false, false, false, true, false, false])
                                                    setMinPrice(300);
                                                    setMaxPrice(400);
                                                    getProductsByPrice(brands, [300, 400], rating);
                                                }}
                                            >
                                                <CircularCheckbox label={'₹300 - 400'} checked={circleChecked[3]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([false, false, false, false, true, false])
                                                    setMinPrice(400);
                                                    setMaxPrice(500);
                                                    getProductsByPrice(brands, [400, 500], rating);
                                                }}

                                            >
                                                <CircularCheckbox label={'₹400 - 500'} checked={circleChecked[4]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCircleChecked([false, false, false, false, false, true])
                                                    setMinPrice(500);
                                                    setMaxPrice(600);
                                                    getProductsByPrice(brands, [500, 600], rating);
                                                }}
                                            >
                                                <CircularCheckbox label={'₹500 - 600'} checked={circleChecked[5]} />
                                            </TouchableOpacity>
                                            <Text style={{
                                                marginTop: 10
                                            }}>
                                                Enter Custom Price:
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: 10,
                                                    alignItems: 'center',
                                                    width: 100,
                                                    justifyContent: 'space-around'
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginRight: 30,
                                                        marginLeft: 10
                                                    }}>
                                                    <TextInput onChangeText={setMinPrice} value={minPrice.toString()} keyboardType={'number-pad'} style={{ borderWidth: 1, borderColor: 'black', height: 20, width: 40 }} />
                                                    <Text>{' - '}</Text>
                                                    <TextInput onChangeText={setMaxPrice} value={maxPrice.toString()} keyboardType={'number-pad'} style={{ borderWidth: 1, borderColor: 'black', height: 20, width: 40, }} />
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setTriggered(true);
                                                        setCircleChecked([false, false, false, false, false, false]);
                                                        getProductsByPrice(brands, [minPrice, maxPrice]);
                                                    }}
                                                    style={{
                                                        backgroundColor: 'tomato',

                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            padding: 2
                                                        }}>
                                                        Go
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View> : <View
                                            style={{
                                                alignItems: 'flex-start',
                                                marginLeft: 10,
                                                width: 190
                                            }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log('h')
                                                setCircleChecked1([true, false, false, false, false, false])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 0);
                                            }}>
                                            <CircularCheckbox label={'Ratings >= 0'} checked={circleChecked1[0]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRating(1);
                                                setCircleChecked1([false, true, false, false, false, false])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 1);
                                            }}
                                        >
                                            <CircularCheckbox label={'Ratings >= 1'} checked={circleChecked1[1]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRating(2);
                                                setCircleChecked1([false, false, true, false, false, false])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 2);
                                            }}
                                        >
                                            <CircularCheckbox label={'Ratings >= 2'} checked={circleChecked1[2]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRating(3);
                                                setCircleChecked1([false, false, false, true, false, false])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 3);
                                            }}
                                        >
                                            <CircularCheckbox label={'Ratings >= 3'} checked={circleChecked1[3]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRating(4);
                                                setCircleChecked1([false, false, false, false, true, false])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 4);
                                            }}

                                        >
                                            <CircularCheckbox label={'Ratings >= 4'} checked={circleChecked1[4]} />

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setRating(5);
                                                setCircleChecked1([false, false, false, false, false, true])
                                                getProductsByPrice(brands, [minPrice, maxPrice], 5);
                                            }}
                                        >
                                            <CircularCheckbox label={'Ratings equal to 5'} checked={circleChecked1[5]} />
                                        </TouchableOpacity>
                                    </View>
                            }

                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                width: 300,
                                justifyContent: 'space-around'
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={[styles.modalActionsButtons]}
                                onPress={() => {
                                    setCircleChecked([false, false, false, false, false, false])
                                    setCircleChecked1([false, false, false, false, false, false])
                                    setMaxPrice(20000);
                                    setMinPrice(0);
                                    clearFilter(setBrands, getProductsByPrice, setTriggered);
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center'
                                    }}>
                                    CLEAR
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalActionsButtons}>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                    }}>
                                    DONE
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </TouchableWithoutFeedback> */}
                </Pressable>
            </Modal>
        </>
    )
}

export default FilterBoxModal

const styles = StyleSheet.create({
    filterMethodsButton: {
        padding: 20,
        paddingRight: 0,
        backgroundColor: 'lightgrey',
        width: '100%'
    },
    brands: {
        margin: 5,
        fontSize: 15,
    },
    modalActionsButtons: {
        fontSize: 10,
        backgroundColor: 'tomato',
        padding: 8,
        width: 70,
    },
})