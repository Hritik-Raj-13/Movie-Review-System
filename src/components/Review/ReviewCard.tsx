import React from 'react';
import { Review } from '../../types/movie';
import StarRating from '../UI/StarRating';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-white font-semibold">{review.userName}</h4>
          <p className="text-slate-400 text-sm">{formatDate(review.createdAt)}</p>
        </div>
        <StarRating rating={review.rating} readonly size="sm" />
      </div>
      
      <p className="text-slate-300 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;