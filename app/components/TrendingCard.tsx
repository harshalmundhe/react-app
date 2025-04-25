import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';


const TrendingCard = ({movie : {mal_id, title,images}, index}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${mal_id}`} asChild>
        <TouchableOpacity className="w-32 relative pl-5">
            <Image
            source={{
            uri:images.jpg.large_image_url
            }}
            className="w-32 h-48 rounded-lg"
            resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-4 rounded-full">
            <MaskedView maskElement={
                <Text className="font-bold text-white text-6xl">{index+1}</Text>
            }>
                <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
            </MaskedView>
        </View>
        
        <Text className="font-bold text-sm mt-2 text-light-200" numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    </Link>

    
  )
}

export default TrendingCard