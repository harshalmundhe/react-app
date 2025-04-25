
import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

const MovieCard = ({mal_id, images, title, title_english, rating, year, popularity}: Movie) => {
  return (
    <Link href={`/movies/${mal_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri:images.jpg.large_image_url
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title_english || title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(popularity / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {year}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;