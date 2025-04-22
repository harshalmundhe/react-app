import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList,SafeAreaView } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchAnime } from "@/services/api";
import MovieCard from "../components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {data: movies, 
    loading: movieLoading,
    error: movieError
  } = useFetch(() => fetchAnime({
    query: ''
  }))
  

  return (
    
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: '100%',
        paddingBottom: 10
      }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {
          movieLoading ? (
            <ActivityIndicator size="large" color="#000ff" className="mt-10 self-center" />
          ) : movieError ? (
            <Text className="text-lg text-white font-bold mt-5 mb-3">Error: {movieError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push('/search')}
                placeHolder="Search for a movie"
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Anime</Text>
              
              
              <FlatList 
              data={movies}
              keyExtractor={(item) => item.mal_id.toString()}
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
              scrollEnabled={false}
              

              />
              
            </View>
          )
           
        }

        
        
      </ScrollView>
    </View> 
  );
}
