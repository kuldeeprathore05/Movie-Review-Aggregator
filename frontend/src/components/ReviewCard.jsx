import React from 'react';
import { Star } from 'lucide-react';
 
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
      />
    );
  }
  return stars;
};

const ReviewCard = ({ review }) => { 
  const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800 p-3 rounded-lg shadow-md flex gap-4">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-lg font-semibold text-white">{review.user}</h4>
          <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>
        </div>
        <div className="bg-gray-600 rounded-lg p-2">
            <p className="text-gray-300">{review.comment}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ReviewCard;