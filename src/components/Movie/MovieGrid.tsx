import React from 'react';
import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  variant?: 'default' | 'featured';
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false, 
  error = null,
  variant = 'default' 
}) => {
  if (loading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  if (error) {
    return <ErrorMessage message={error} className="py-12" />;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No movies found</p>
      </div>
    );
  }

  const gridClasses = variant === 'featured'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4';

  return (
    <div className={gridClasses}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant={variant} />
      ))}
    </div>
  );
};

export default MovieGrid;