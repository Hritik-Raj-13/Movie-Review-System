import React, { useState } from 'react';
import { MovieFilters } from '../types/movie';
import { useMovies } from '../hooks/useMovies';
import MovieFiltersComponent from '../components/Movie/MovieFilters';
import MovieGrid from '../components/Movie/MovieGrid';

const MoviesPage: React.FC = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    genre: '',
    year: '',
    minRating: 0,
  });

  const { movies, loading, error } = useMovies(filters);

  const handleFiltersChange = (newFilters: Partial<MovieFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Movies</h1>
          <p className="text-slate-400">Discover and explore our complete movie collection</p>
        </div>

        <MovieFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />
        
        <div className="mb-4">
          <p className="text-slate-400">
            {loading ? 'Loading...' : `Found ${movies.length} movie${movies.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <MovieGrid movies={movies} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default MoviesPage;