import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Calendar, Heart } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useAppContext } from '../../context/AppContext';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'featured';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, variant = 'default' }) => {
  const { state, dispatch } = useAppContext();
  const isInWatchlist = state.watchlist.includes(movie.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movie.id });
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie.id });
    }
  };

  const cardClasses = variant === 'featured' 
    ? 'group relative overflow-hidden rounded-lg bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
    : 'group relative overflow-hidden rounded-lg bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102';

  return (
    <Link to={`/movie/${movie.id}`} className={cardClasses}>
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <button
        onClick={handleWatchlistToggle}
        className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10"
      >
        <Heart className={`h-4 w-4 ${isInWatchlist ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-transparent">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        
        <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}m</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-white font-medium">{movie.rating}/10</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((g) => (
              <span key={g} className="px-2 py-1 bg-amber-400/20 text-amber-400 text-xs rounded-full">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;