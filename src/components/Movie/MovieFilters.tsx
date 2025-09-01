import React from 'react';
import { Search, Filter } from 'lucide-react';
import { MovieFilters } from '../../types/movie';

interface MovieFiltersProps {
  filters: MovieFilters;
  onFiltersChange: (filters: Partial<MovieFilters>) => void;
}

const MovieFiltersComponent: React.FC<MovieFiltersProps> = ({ filters, onFiltersChange }) => {
  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-amber-400" />
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Genre</label>
          <select
            value={filters.genre}
            onChange={(e) => onFiltersChange({ genre: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Year</label>
          <select
            value={filters.year}
            onChange={(e) => onFiltersChange({ year: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Min Rating</label>
          <select
            value={filters.minRating.toString()}
            onChange={(e) => onFiltersChange({ minRating: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="0">Any Rating</option>
            <option value="7">7+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="9">9+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieFiltersComponent;