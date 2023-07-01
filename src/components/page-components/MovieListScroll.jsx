import React, { useState, useEffect } from "react";
import "./MovieListScroll.scss";
import Cards from "../style-components/Cards";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MovieListScroll = () => {
  const env =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE_baseURL
      : process.env.REACT_APP_PRO_MODE_baseURL;
  var [movieList, movieListChange] = useState([]);
  var [searchTerm, searchTermChange]=useState("")
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get(`${env}/api/movies`).then((response) => {
      movieListChange(response.data);
    });
  }, []);
  const search = (event) => {
    if (event.target.value.length > 0) {
      searchTermChange(event.target.value)
      axios
        .get(`${env}/api/movies/search/${event.target.value}`)
        .then((response) => {
          movieListChange(response.data);
        })
        .catch(() => {
          movieListChange([]);
        });
    } else
      axios.get(`${env}/api/movies`).then((response) => {
        movieListChange(response.data);
        searchTermChange("")
      });
  };


  return (
    <div className="movie-list">
      
      {searchTerm.length==0?<h2>All Movies</h2>:<h2>Search Results</h2> }
      <div className="search-bar">
        <div className="search-container">
          <input
            onChange={search}
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="container cards">
        {movieList.length > 0 ? (
          movieList.map((movie, index) => {
            return <Cards details={movie} key={index} />;
          })
        ) : (
          <p>No movies matching the title was found</p>
        )}
      </div>
    </div>
  );
};

export default MovieListScroll;
