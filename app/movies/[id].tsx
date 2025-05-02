import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchAnimeDetails } from '@/services/api';
import { icons } from "@/constants/icons";

const ModeDetails = () => {
  const {id} = useLocalSearchParams();
  const {data: movie, loading} = useFetch(() => fetchAnimeDetails(id as string));

  console.log(JSON.stringify(movie));
  interface AnineInfoProps {
    label: string;
    value?: string | number | null;
  }

  const AnimeInfo = ({label, value}:  AnineInfoProps) => {
      return (<View className='flex-col items-start justify-center mt-5'>
          <Text className='text-light-200 font-normal text-sm'>{label}</Text>
          <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
      </View>)
  }

  return (
    <View className='bg-primary flex-1'>
      {loading && (
          <ActivityIndicator size="large" color="#0000ff" className='my-3' />
      )}
      {!loading && (
      <ScrollView contentContainerStyle={{
          paddingBottom:80
      }}>
        <View>
            { <Image
                        source={{
                        uri:movie?.images.jpg.large_image_url
                        }}
                        className="w-full h-[550px]" 
                        resizeMode="stretch"
                    /> }
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
              <View className='flex-row items-center gap-x-1 mt-2'>
                <Text className='text-light-200 text-sm'>{movie?.year}</Text>
                <Text className='text-light-200 text-sm'>{movie?.duration}</Text>
              </View>
        </View>

        <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className="size-4" />
                      <Text className="text-xs text-white font-bold uppercase">
                        {Math.round((movie?.popularity ?? 0) / 2)}/10
                      </Text>
                      <Text className='text-light-200 text-sm'>
                          ({movie?.favorites} votes)
                      </Text>
        </View>

        <AnimeInfo label='Overview' value={movie?.synopsis} />
        <AnimeInfo label='Genre' value={movie?.genres.map((g) => g.name).join(' - ')  || 'N/A'} />

          <View className='flex flex-row justify-between w-full pl-2'>
              <AnimeInfo label="Status" value={movie?.status}  />
              <AnimeInfo label="Rating" value={movie?.rating}  />
          </View>

          <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
                <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
                <Text className='text-white font-semibold text-base'>Go Back</Text>
          </TouchableOpacity>
      </ScrollView>
      )}
    </View>
  )
}

export default ModeDetails