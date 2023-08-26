import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const SkeletonComponent = ({width}) => {

    const animatedValue = new Animated.Value(0);
    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear.inOut,
                useNativeDriver: true,
            })).start();
    })
    // const width = Dimensions.get('window').width;
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    })
    const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

    return (
        <Animated.View
            style={{
                backgroundColor: '#d2d2d2',
                borderColor: '#b0b0b0',
                width: width,
                overflow:'hidden',
                height: '100%'
            }}>
            <AnimatedLG
                colors={["#d2d2d2", "#b0b0b0", "#b0b0b0", "#d2d2d2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateX: translateX }]
                }}

            />

        </Animated.View>
    )
}

export default SkeletonComponent