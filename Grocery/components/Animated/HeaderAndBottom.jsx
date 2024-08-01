import { View, Text, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header';
import BottomNavigator from '../Bottom/BottomNavigator';
import { useNavigationState, useRoute } from '@react-navigation/native';

const CONTAINER_HEIGHT = 90;
const BOTTOM_HEIGHT = 60;
var _clampedScrollValue = 0;
var _offsetValue = 0;
var _scrollValue = 0;


var scrollEndTimer = null;


export const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer)
}
export const onMomentumScrollEnd = (offsetAnim) => {
    const toValue = _scrollValue > CONTAINER_HEIGHT &&
        _clampedScrollValue > (CONTAINER_HEIGHT) / 2
        ? _offsetValue + CONTAINER_HEIGHT : _offsetValue - CONTAINER_HEIGHT;
    Animated.timing(offsetAnim, {
        toValue: toValue,
        duration: 1000,
        useNativeDriver: true,
    }).start();
}
export const onScrollEndDrag = (offsetAnim) => {
    setTimeout(() => {
        onMomentumScrollEnd(offsetAnim);
    }, 500);
}

const HeaderAndBottom = ({ scrollY, offsetAnim }) => {


    const navigationState = useNavigationState((state) => state);
    const route = useRoute();
    // const offsetAnim = useRef(new Animated.Value(0)).current;
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,
        ),
        0,
        CONTAINER_HEIGHT
    )
    const clampedScroll1 = Animated.diffClamp(
        Animated.add(
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,
        ),
        0,
        BOTTOM_HEIGHT
    )

    useEffect(() => {
        _clampedScrollValue = 0
        _offsetValue = 0
        _scrollValue = 0
        scrollEndTimer = null
        scrollY.setValue(0);
        offsetAnim.setValue(0);
    }, [navigationState])
    useEffect(() => {
        scrollY.addListener(({ value }) => {
            var diff = value - _scrollValue;
            _scrollValue = value;
            _clampedScrollValue = Math.min(
                Math.max(_clampedScrollValue + diff, 0),
                CONTAINER_HEIGHT,
            )
        });
        offsetAnim.addListener(({ value }) => {
            _offsetValue = value;
        })
    }, [navigationState]);

    const headerTranslate = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, -CONTAINER_HEIGHT],
        extrapolate: 'clamp',
    })
    const bottomTabTranslate = clampedScroll1.interpolate({
        inputRange: [0, BOTTOM_HEIGHT],
        outputRange: [0, BOTTOM_HEIGHT * 2],
        extrapolate: 'clamp',
    })

    return (
        <>
            <Animated.View style={{
                height: CONTAINER_HEIGHT,
                position: 'absolute',
                width: Dimensions.get('screen').width,
                zIndex: 100,
                left: 0,
                top: 0,
                transform: [{ translateY: headerTranslate }]
            }}>
                <Header />
            </Animated.View>
            <Animated.View style={{
                position: 'absolute',
                height: 60,
                zIndex: 200,
                bottom: 0,
                width: Dimensions.get('screen').width,
                transform: [{ translateY: bottomTabTranslate }]
            }}>
                <BottomNavigator />
            </Animated.View>
        </>
    )
}

export default HeaderAndBottom