import { View, Text, Image, FlatList, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import useFetch from "@/services/useFetch";
import { fetchAnime } from "@/services/api";
import MovieCard from '../components/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from "../components/SearchBar";
import FilterModal from '../components/FilterModal';

const search = () => {
  
  const  [seachQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [anime, setAnime] = useState([]);


  const {data: movies, 
    loading,
    error,
    refetch: loadAnimes,
    reset
  } = useFetch(() => fetchAnime({
    query: seachQuery,
    page:page
  }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if(seachQuery.trim()) {
        await loadAnimes()
      } else {
        reset()
      }
    }, 500);
    return () => clearInterval(timeoutId);
  }, [seachQuery]);


    
  
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0'  resizeMode='cover' />

      <FlatList 
          data={movies?.data} 
          keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap:20,
                paddingRight:5,
                marginBottom:10

              }}
              renderItem={({item}) => (
                  <MovieCard 
                    {...item}
                  />
              )}
              className="mt-2 pb-32"
              scrollEnabled={true}
              contentContainerStyle={{
                paddingBottom: 100
              }}
              ListHeaderComponent={
                <>
                  <View className='w-full flex-1 justify-center mt-10'>
                  <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto" />
                  </View>
                  
                  <View className='w-full flex-1 justify-center mt-10'>
                  <SearchBar
                    placeHolder="Search movie..."
                    value={seachQuery}
                    onChangeText={(text: string) => {setSearchQuery(text)} }
                  />
                  <FilterModal />
                  
                  </View>

                  {loading && (
                    <ActivityIndicator size="large" color="#0000ff" className='my-3' />
                  )}

                  {error && (
                    <Text className='text-red-500 px=5 my-3 '>
                      Error {error.message}
                    </Text>
                  )}

                  {!loading && !error && seachQuery.trim() && movies?.length > 0 && (
                    <Text className='text-xl text-white '>
                      Search Results for {' '}
                      <Text className='text-accent'>{seachQuery}</Text>
                    </Text>
                  )}
                </>
              }
              ListEmptyComponent={
                !loading && !error ? (
                  <View>
                    <Text className='text-center text-gray-500'>
                      {seachQuery.trim() ? 'No Anime Found': 'Serach for Anime'}
                    </Text>
                  </View>
                ):null
              }
          >

      </FlatList>
    </View>
  )
}

export default search