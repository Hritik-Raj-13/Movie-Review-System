import { useState, useEffect } from 'react';
import { Movie, MovieFilters } from '../types/movie';
import { movieAPI } from '../services/api';

export const useMovies = (filters?: Partial<MovieFilters>) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const moviesData = await movieAPI.getMovies(filters);
        setMovies(moviesData);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters?.search, filters?.genre, filters?.year, filters?.minRating]);

  return { movies, loading, error };
};

export const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await movieAPI.getMovie(id);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  return { movie, loading, error };
};