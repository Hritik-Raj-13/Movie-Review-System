import React, { useState } from 'react';
import { Review } from '../../types/movie';
import StarRating from '../UI/StarRating';
import LoadingSpinner from '../UI/LoadingSpinner';

interface ReviewFormProps {
  movieId: string;
  onSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>;
  loading?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onSubmit, loading = false }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || comment.trim() === '') {
      return;
    }

    try {
      await onSubmit({
        movieId,
        userId: 'current-user-id', // In real app, get from auth context
        userName: 'Current User', // In real app, get from auth context
        rating,
        comment: comment.trim(),
      });
      
      // Reset form
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            rows={4}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0 || comment.trim() === '' || loading}
          className="w-full bg-amber-400 text-slate-900 font-semibold py-2 px-4 rounded-md hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;