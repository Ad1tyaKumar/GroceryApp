import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const Success = () => {
    const navigation=useNavigation();
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height:'80%',
            }}>
            <Icon name='check-circle' color={'royalblue'} size={75} />
            <Text style={{
                fontSize:20,
                marginTop:40,
            }}>Order Place Successfully!</Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate('home')}
            style={{
                backgroundColor:'royalblue',
                padding:10,
                marginTop:20,
            }}>
                <Text style={{
                    color:'white'
                }}>
                    GO HOME
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Success