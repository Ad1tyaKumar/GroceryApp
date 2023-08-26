import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SkeletonComponent from '../Skeleton/SkeletonComponent'


const CardSkeleton = ({ cards }) => {
    return Array(cards).fill(0).map((_, i) => (
        <View
            key={i}
            style={styles.productContainer}>
            <View
                style={{
                    height: 140,
                    marginTop: 15, marginLeft: 10
                }}>
                <SkeletonComponent width={140} />
            </View>
            <View
                style={{
                    marginTop: 10,
                    marginLeft: 10,
                    height: 30,
                }}>
                <SkeletonComponent width={140} />
            </View>
            <View
                style={{
                    marginTop: 5,
                    marginLeft: 10,
                    height: 20,
                }}>
                <SkeletonComponent width={50} />
            </View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'100%',
                    marginTop: 10,
                }}>
                <View
                style={{
                    height:30,
                }}>
                    <SkeletonComponent width={100} />
                </View>
            </View>
        </View>
    ))
}

export default CardSkeleton

const styles = StyleSheet.create({
    productContainer: {
        height: 270,
        width: 160,
        // backgroundColor:'red',
        // alignItems:'center',
        borderColor: 'black',
        elevation: 3,
        borderRadius: 3,
        margin: 5,
        // flex:1
    },
    addContainer: {
        backgroundColor: '#26a541',
        width: 140,
        height: 30,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        marginLeft: 10,
    }
})
