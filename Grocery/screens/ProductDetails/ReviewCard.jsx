import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import Stars from 'react-native-stars'
import Icon from '@expo/vector-icons/Ionicons';
import Profile from '../../images/Profile.png'

const ReviewCard = ({ review }) => {
  return (
    <View
      style={{
        borderColor: 'lightgrey',
        borderWidth: 1,
        margin: 10,
        maxWidth: 300,
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image source={Profile} style={{
        height: 100,
        width: 100
      }} />
      <Text
        style={{
          margin: 5,
          fontSize: 15,
          fontWeight: '500'
        }}>{review.name}</Text>
      <Stars
        disabled={true}
        spacing={3}
        fullStar={<Icon name='star-sharp' size={20} color={'tomato'} />}
        halfStar={<Icon name='star-half-sharp' size={20} color={'tomato'} />}
        emptyStar={<Icon name='star-outline' size={20} color={'tomato'} />}
        half={true}
        count={5}
        default={review.rating}
      />
      <Text
        style={{
          margin: 10,
          fontSize: 13
        }}>{review.comment}</Text>
    </View>
  )
}

export default ReviewCard