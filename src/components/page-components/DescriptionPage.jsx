import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./DescriptionPage.scss";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DescriptionPage = () => {
  const navigate = useNavigate();
  const env =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE_baseURL
      : process.env.REACT_APP_PRO_MODE_baseURL;
  let query = useQuery();
  let currentId = query.get("id");
  const [movieObj, movieObjChange] = useState({ tags: [], cast: [] });
  useEffect(() => {
    axios.get(`${env}/api/movies/${currentId}`).then((response) => {
      console.log(response);
      movieObjChange(response.data);
    });
  }, []);
  const clickButton = (mode) => {
    if (mode == "delete") {
      axios.delete(`${env}/api/movies/${currentId}`).then((response) => {
        navigate("/");
      });
    }
    if (mode == "edit") {
      navigate("../edit?id=" + currentId);
    }
  };

  return (
    <div className="desc">
      <h2>{movieObj.title}</h2>
      <div className="tags">
            {movieObj.tags.length > 1
              ? movieObj.tags.map((tag) => {
                  return (
                    <span class="chip">
                      <i class="chip__label">{tag}</i>
                    </span>
                  );
                })
              : movieObj.tags}
          </div>
      <div className="cast-crew">
        <div className="poster">
          <img src={movieObj.imageUrl} alt="" />
        </div>
        <div className="det">
          <p>
            <span className="field">Director</span>
            {movieObj.director}
          </p>
          <p>
            <span className="field">Cast</span>
            {movieObj.cast.length > 1
              ? movieObj.cast.join(", ")
              : movieObj.cast}
          </p>
          <p>
            <span className="field">Genre</span>
            {movieObj.genre}
          </p>
          
          <div className="button-set">
            <button
              className="button-17"
              onClick={() => {
                clickButton("delete");
              }}
            >
              Delete
            </button>
            <button
              className="button-17"
              onClick={() => {
                clickButton("edit");
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="trailer-wrap">
        <h3>Trailer</h3>
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + movieObj.trailerUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="summary">
        <h3>Summary</h3>
        <p>{movieObj.description}</p>
      </div>
    </div>
  );
};

export default DescriptionPage;
