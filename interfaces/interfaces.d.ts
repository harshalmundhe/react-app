interface Movie {
  id: number;
  mal_id: number;
  title: string;
  rating: number;
  score: number;
  rank: number;
  popularity: number;
  synopsis: string;
  year: string;
  aired: string[];
  title_english: string;
  images: any;
}

interface TrendingMovie {
  id: number;
  mal_id: number;
  title: string;
  images: any;
  title_english: string;
}

interface MovieDetails {
  id: number;
  mal_id: number;
  title: string;
  rating: number;
  score: number;
  rank: number;
  popularity: number;
  synopsis: string;
  year: string;
  aired: string[];
  title_english: string;
  images: any;
  episodes: number;
  duration: string;
  favorites: number;
  genres: any;
  status: string;
  
} 

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
