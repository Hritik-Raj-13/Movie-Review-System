import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Calendar, Star, Heart, User } from 'lucide-react';
import { useMovie } from '../hooks/useMovies';
import { useAppContext } from '../context/AppContext';
import { movieAPI } from '../services/api';
import { Review } from '../types/movie';
import StarRating from '../components/UI/StarRating';
import ReviewCard from '../components/Review/ReviewCard';
import ReviewForm from '../components/Review/ReviewForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovie(id!);
  const { state, dispatch } = useAppContext();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const isInWatchlist = movie ? state.watchlist.includes(movie.id) : false;

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      
      try {
        setReviewsLoading(true);
        const reviewsData = await movieAPI.getReviews(id);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    if (isInWatchlist) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movie.id });
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie.id });
    }
  };

  const handleReviewSubmit = async (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    try {
      const newReview = await movieAPI.addReview(reviewData);
      setReviews(prev => [newReview, ...prev]);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return <ErrorMessage message={error || 'Movie not found'} className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Movie Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
              />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
                <p className="text-lg text-slate-300 leading-relaxed">{movie.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{movie.rating}/10</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <span key={g} className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-400">Director: </span>
                  <span className="text-white">{movie.director}</span>
                </div>
                <div>
                  <span className="text-slate-400">Cast: </span>
                  <span className="text-white">{movie.cast.join(', ')}</span>
                </div>
              </div>

              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isInWatchlist
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-6 w-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Reviews</h2>
              <span className="text-slate-400">({reviews.length})</span>
            </div>

            {reviewsLoading ? (
              <LoadingSpinner size="md" className="py-8" />
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No reviews yet. Be the first to review this movie!</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ReviewForm movieId={movie.id} onSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;