import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // Correct path
import Loader from '../components/Loader'; // Correct path
import { SERVER } from '../constant';
const Home = () => { 
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
         
        const res = await axios.get(`${SERVER}/api/movie`);
        console.log(res)
        setMovies(res.data);

      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);  

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-400 text-xl">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Top Rated Movies</h1>
      
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => ( 
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 text-xl">
          No movies found.
        </div>
      )}
    </div>
  );
};

export default Home;