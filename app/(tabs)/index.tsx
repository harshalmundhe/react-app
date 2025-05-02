import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList,SafeAreaView } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchAnime, fetchTrendingAnime } from "@/services/api";
import MovieCard from "../components/MovieCard";
import TrendingCard from "../components/TrendingCard";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [anime, setAnime] = useState([]);
   
  const {
    data: trendingMovies, 
    loading: trendingMovieLoading,
    error:trendingMovieError
  } = useFetch(() => fetchTrendingAnime())


  const {data: movies, 
    loading: movieLoading,
    error: movieError,
    pagination: pagination,
    refetch: loadAnimes,
  } = useFetch(() => fetchAnime({
    query: '',
    page:page
  }), true, true);

  
  

  const homeHeader = () => {
    return (
<>
        {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Anime</Text>
                <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={
                () => <View className="w-4" />
                }
              data={trendingMovies}
              renderItem={({item, index}) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.mal_id.toString()}
              
              />
              </View>
              
        )}
        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Anime</Text>
      </>
    );
  }

  const updatePage =  () => {
    const timeoutId = setTimeout(async () => {
      setPage(page+1);
    }, 5000);
      return () => clearInterval(timeoutId);
  }


  useEffect(() => {
    
    if(page && page > 1) {
      loadAnimes()
    }
    
  },[page])

  useEffect(() => {
    
    if(movies?.length > 0) {
      console.log("here in setting");
      if(anime.length > 0) {
        setAnime([...anime, ...movies]);
      } else {
        setAnime(movies);
      }
      

    }
    
  },[movies])


  const showLoading  = () => {
    return (
      <>
        {
          page > 1 && (movieLoading || trendingMovieLoading) ? (
            <ActivityIndicator size="large" color="#000ff" className="mt-10 self-center" />
          ) : null
        }
      </>

    );
  }

  return (
    
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />

        <SearchBar
                onPress={() => router.push('/search')}
                placeHolder="Search for a movie"
              />

        {
          page == 1 && (movieLoading || trendingMovieLoading) ? (
            <ActivityIndicator size="large" color="#000ff" className="mt-10 self-center" />
          ) : movieError || trendingMovieError ? (
            <Text className="text-lg text-white font-bold mt-5 mb-3">Error: {movieError?.message || trendingMovieError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              
              
              
              {anime?.length > 0 ? (
              <FlatList 
              data={anime}
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
              ListHeaderComponent={homeHeader}

              onEndReachedThreshold={0}
              onEndReached={updatePage}
              ListFooterComponent={showLoading}


              />
            ) : null}
              
            </View>
          )
           
        }
        

        
        
    </View> 
  );
}
