import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/scss/style.scss'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, ] = useState(10);

  // useEffect(() => {
  //   fetchMovies();
  // }, [filter]);

  // const fetchMovies = async () => {
  //   const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=${query}`);
  //   setMovies(response.data.results);
  // };

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Genres</option>
        {/* Render Genre options here */}
      </select>
      <div className="movies">
        {currentMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
            <p>{movie.genre_ids.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(movies.length / moviesPerPage))].map((e, i) => (
          <div
            key={i}
            id={i + 1}
            onClick={(event) => handlePageChange(event)}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
