import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Icon from '@expo/vector-icons/AntDesign';
import Icon1 from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useSearch } from '../SearchContext';

const BottomNavigator = ({resetDrawer}) => {
    const route = useRoute();
    const { scrollY } = useSearch();

    const navigation = useNavigation();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    // console.log(Dimensions.get('screen').height);
    const animation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.spring(animation, {
            toValue: scrollY ? 0 : 1,
            useNativeDriver: true
        }).start();
    }, [scrollY])

    return (
        <Animated.View
            style={[styles.bottomNavigator,{transform:[{
                translateY: resetDrawer?0:animation.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,50],
                })
            }]}]}>
            <TouchableOpacity
                onPress={() => navigation.navigate('home')}
                style={styles.navigationButtons}>
                <Icon name='home' color={route.name === 'home' ? 'green' : 'black'} size={30} />
                <Text
                    style={{
                        textAlign: 'center',
                        color: route.name === 'home' ? 'green' : 'black'
                    }}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { isAuthenticated ? navigation.navigate('profile') : navigation.navigate('signin') }}
                style={styles.navigationButtons}>
                <Icon name='user' color={route.name === 'profile' ? 'green' : 'black'} size={30} />
                <Text
                    style={{
                        textAlign: 'center',
                        color: route.name === 'profile' ? 'green' : 'black'
                    }}>
                    Profile
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('orders')}
                style={styles.navigationButtons}>
                <Icon1 name='box' color={route.name === ('orders') || (route.name === 'order-details') ? 'green' : 'black'} size={30} />
                <Text
                    style={{
                        textAlign: 'center',
                        color: route.name === ('orders') || (route.name === 'order-details') ? 'green' : 'black'
                    }}>
                    Orders
                </Text>
            </TouchableOpacity>
        </Animated.View >
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    navigationButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    bottomNavigator: {
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
    },
})