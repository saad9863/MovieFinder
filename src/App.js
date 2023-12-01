import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=[ENTER YOUR API KEY HERE]";

const App = () => {
  const [movies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        // Check if the response status is not OK
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert("No Such Movie Exist");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch movie data. Please try again later.");
    }
  };

  return (
    <div className="app">
      <h1>Movie Finder</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Such Movie Exist</h2>
        </div>
      )}
    </div>
  );
};

export default App;
