import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Icon1 from '@expo/vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useSearch } from '../SearchContext';

const BottomNavigator = ({ }) => {
    const route = useRoute();

    const navigation = useNavigation();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    // console.log(Dimensions.get('screen').height);

    return (
        <View
            style={[styles.bottomNavigator]}>
            <TouchableOpacity
                onPress={() => navigation.navigate('home')}
                style={styles.navigationButtons}>
                <View style={(route.name === 'home' || (route.name === 'products') || (route.name === 'product-details')) && {
                    backgroundColor: '#07a5353b',
                    width: 55,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 5
                }}>
                    <Icon name='home' color={route.name === 'home' || (route.name === 'products') || (route.name === 'product-details') ? 'green' : 'black'} size={30} />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        // color: route.name === 'home' ? 'green' : 'black'
                    }}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { isAuthenticated ? navigation.navigate('profile') : navigation.navigate('signin') }}
                style={styles.navigationButtons}>
                <View
                    style={(route.name === 'profile' || route.name === 'signin') && {
                        backgroundColor: '#07a5353b',
                        width: 55,
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 5
                    }}>
                    <Icon name='account' color={route.name === 'profile' || route.name === 'signin' ? 'green' : 'black'} size={30} />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        // color: route.name === 'profile' ? 'green' : 'black'
                    }}>
                    Profile
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => isAuthenticated ? navigation.navigate('orders') : navigation.navigate('signin')}
                style={styles.navigationButtons}>
                <View style={(route.name === ('orders') || (route.name === 'order-details')) && {
                    backgroundColor: '#07a5353b',
                    width: 55,
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 5
                }}>
                    <Icon name='cube-outline' color={route.name === ('orders') || (route.name === 'order-details') ? 'green' : 'black'} size={30} />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        // color: route.name === ('orders') || (route.name === 'order-details') ? 'green' : 'black'
                    }}>
                    Orders
                </Text>
            </TouchableOpacity>
        </View >
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
        backgroundColor: '#e3eee6',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
        // position: 'absolute',
        // bottom: 0,
    },
})