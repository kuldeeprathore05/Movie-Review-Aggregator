import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import { Star, Clapperboard, Calendar } from 'lucide-react';
import { SERVER } from '../constant';

const MovieDetail = () => {
  const { id } = useParams();  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchMovieData = useCallback(async () => {
    try {
      setLoading(true);  
      const res = await axios.get(`${SERVER}/api/movie/${id}`);
      
      console.log(res)
      setMovie(res.data);
      
    } catch (err) {
      console.error("Error fetching movie details:", err);
    } 
    finally{
        setLoading(false)
    }
  }, [id]);  

  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);  
 
  if (loading) {
    return <Loader />;
  }

  
  if (!movie) {
    return null;  
  }
  
  const rating = movie.avgRating ? movie.avgRating.toFixed(1) : 'N/A';
  const reviewCount = movie.reviewCount || 0;

  return (
    <div className="space-y-12">
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/300x450/222/FFF?text=No+Poster';
            }}
          />
        </div>

        <div className="md:col-span-2 space-y-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold">{movie.title}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="font-bold text-white">{rating}</span>
              <span className="text-sm">({reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{movie.releaseYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clapperboard size={20} />
              <span>{movie.genre}</span>
            </div>
          </div>
          <p className="text-lg text-gray-300 pt-4 whitespace-pre-line">
            {movie.description}
          </p>
          <div className="mx-4">
            <ReviewForm movieId={id} onReviewSuccess={fetchMovieData} />
            </div>
        </div>
      </div>


      <div className="p-4">
        

        
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Recent Reviews ({reviewCount})
          </h2>
          {movie.recentReview && movie.recentReview.length > 0 ? (
            <div className="space-y-6">
              {movie.recentReview.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              Be the first to review this movie!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;