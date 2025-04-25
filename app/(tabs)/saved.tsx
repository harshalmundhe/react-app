import { View, Text, Image } from 'react-native'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import React from 'react'

const saved = () => {
  return (
    <View className='flex-1 bg-primary px-10'>
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
          <Text className='text-white text-bold'>Please login to save</Text>
          </View>
    </View>
  )
}

export default saved