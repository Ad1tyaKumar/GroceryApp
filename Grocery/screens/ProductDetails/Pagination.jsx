import { StyleSheet, Animated, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

// const {width} = Dimensions.get('screen');
const width = 250;

const Pagination = ({ data, scrollX, index,onDotPress }) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 18, 8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#000', '#ccc'],
                    extrapolate: 'clamp',
                });

                return (
                    <TouchableOpacity
                        key={idx.toString()}
                        onPress={() => onDotPress(idx)}
                    >

                        <Animated.View
                            style={[
                                styles.dot,
                                { width: dotWidth, backgroundColor },
                                idx === index && styles.dotActive,
                            ]}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#000',
    },
});