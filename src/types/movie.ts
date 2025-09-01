export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  year: number;
  rating: number;
  duration: number;
  director: string;
  cast: string[];
  poster: string;
  trailer?: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  watchlist: string[];
  reviews: Review[];
}

export interface MovieFilters {
  search: string;
  genre: string;
  year: string;
  minRating: number;
}