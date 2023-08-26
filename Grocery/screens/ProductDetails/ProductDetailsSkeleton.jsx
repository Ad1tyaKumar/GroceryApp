import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import SkeletonComponent from '../../components/Skeleton/SkeletonComponent'

const ProductDetailsSkeleton = () => {
    return (
        <View
            style={{ alignItems: 'center' }}>
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
                <View
                    style={{ height: 250, width: 250, marginTop: 10 }}>
                    <SkeletonComponent width={250} />
                </View>
            </View>
            <View
                style={{
                    marginTop: 10,
                    width: '80%',
                    marginBottom: 20
                }}>
                <View
                    style={{
                        height: 18,
                        marginTop: 15,
                    }}>
                    <SkeletonComponent width={250} />
                </View>
                <View
                    style={{
                        height: 18,
                        marginTop: 15,
                    }}>
                    <SkeletonComponent width={150} />
                </View>
                <View
                    style={{
                        height: 25,
                        marginTop: 15,
                    }}>
                    <SkeletonComponent width={50} />
                </View>
                <View
                    style={{
                        height: 18,
                        marginTop: 15,
                    }}>
                    <SkeletonComponent width={180} />
                </View>
                <View
                    style={{
                        height: 12,
                        marginTop: 15,
                    }}>
                    <SkeletonComponent width={100} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 40,
                        marginBottom: 20
                    }}>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                        }}>
                        <SkeletonComponent width={30} />
                    </View>
                    <View
                        style={{
                            marginLeft: 8,
                            marginRight: 8,
                            height: 25,
                        }}>
                        <SkeletonComponent width={25} />
                    </View>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                        }}>
                        <SkeletonComponent width={30} />
                    </View>
                    <View
                        style={{
                            height: 30,
                            width: 100,
                            marginLeft: 20,
                        }}>
                        <SkeletonComponent width={100} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductDetailsSkeleton