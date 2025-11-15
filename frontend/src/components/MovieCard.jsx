import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  
  const rating = movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A';

  return (
    <Link 
      to={`/movie/${movie._id}`} 
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/300x450/222/FFF?text=No+Poster';
          }}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
          <Star size={16} className="fill-current" />
          <span>{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white truncate" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-gray-400">{movie.releaseYear}</p>
      </div>
    </Link>
  );
};

export default MovieCard;