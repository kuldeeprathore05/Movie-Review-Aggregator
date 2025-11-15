import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard'; // Correct path
import Loader from '../components/Loader'; // Correct path
import { SERVER } from '../constant';
import Pagination from './Pagination';
import useDebounce from '../hooks/useDebounce';
import { Search } from 'lucide-react';
const Home = () => { 
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
         
        const res = await axios.get(`${SERVER}/api/movie?page=${page}&limit=8&search=${debouncedSearchTerm}`);
        console.log(res)
        setMovies(res.data.movies);
        setTotalPages(res.data.totalPages);

      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page,debouncedSearchTerm]);  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-400 text-xl">{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Top Rated Movies</h1>
         
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-2 pl-10 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies?.map((movie) => ( 
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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