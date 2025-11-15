import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER } from '../constant';
const ReviewForm = ({ movieId, onReviewSuccess }) => { 
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
   
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const savedName = localStorage.getItem('reviewerName');
    if (savedName) {
      setUser(savedName);
    }
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment) {
      setError('Name and comment fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try { 
      localStorage.setItem('reviewerName', user); 
      const payload = {
        movieId,
        user,
        rating: Number(rating),
        comment
      };
      
      await axios.post(`${SERVER}/api/review`, payload);  
      setComment('');
      setRating(5); 
      if (onReviewSuccess) {
        onReviewSuccess();
      }

    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
      <h3 className="text-2xl font-semibold text-white mb-4">Add Your Review</h3>
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-300 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
          Comment
        </label>
        <textarea
          id="comment"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think of the movie?"
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-md transition-colors hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;