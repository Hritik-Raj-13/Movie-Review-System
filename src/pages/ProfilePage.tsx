import React, { useState, useEffect } from 'react';
import { Heart, Star, Calendar, Film } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Movie, Review } from '../types/movie';
import { movieAPI } from '../services/api';
import MovieCard from '../components/Movie/MovieCard';
import ReviewCard from '../components/Review/ReviewCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'watchlist' | 'reviews'>('watchlist');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      if (state.watchlist.length === 0) {
        setWatchlistMovies([]);
        return;
      }

      try {
        setLoading(true);
        const allMovies = await movieAPI.getMovies();
        const watchlistMoviesData = allMovies.filter(movie => 
          state.watchlist.includes(movie.id)
        );
        setWatchlistMovies(watchlistMoviesData);
      } catch (error) {
        console.error('Error fetching watchlist movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, [state.watchlist]);

  // Mock user reviews - in real app, fetch from API
  useEffect(() => {
    setUserReviews([
      {
        id: '1',
        movieId: '1',
        userId: 'current-user-id',
        userName: 'Current User',
        rating: 5,
        comment: 'Absolutely stunning visuals and an epic continuation of the Dune saga.',
        createdAt: '2024-03-15T10:30:00Z',
      },
      {
        id: '2',
        movieId: '2',
        userId: 'current-user-id',
        userName: 'Current User',
        rating: 4,
        comment: 'A masterpiece of filmmaking. Nolan at his finest.',
        createdAt: '2024-03-10T14:20:00Z',
      },
    ]);
  }, []);

  const stats = {
    watchlistCount: state.watchlist.length,
    reviewsCount: userReviews.length,
    averageRating: userReviews.length > 0 
      ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length 
      : 0,
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">JD</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">John Doe</h1>
              <p className="text-slate-400">Movie Enthusiast</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-red-400" />
                <span className="text-2xl font-bold text-white">{stats.watchlistCount}</span>
              </div>
              <p className="text-slate-400 text-sm">Movies in Watchlist</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Film className="h-5 w-5 text-amber-400" />
                <span className="text-2xl font-bold text-white">{stats.reviewsCount}</span>
              </div>
              <p className="text-slate-400 text-sm">Reviews Written</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-slate-400 text-sm">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-lg">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'watchlist'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                Watchlist ({stats.watchlistCount})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                Reviews ({stats.reviewsCount})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'watchlist' && (
              <div>
                {loading ? (
                  <LoadingSpinner size="md" className="py-8" />
                ) : watchlistMovies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {watchlistMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Your watchlist is empty</p>
                    <p className="text-slate-500 text-sm">Add movies to your watchlist to keep track of what you want to watch</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {userReviews.length > 0 ? (
                  <div className="space-y-4">
                    {userReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No reviews yet</p>
                    <p className="text-slate-500 text-sm">Start watching movies and share your thoughts!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;