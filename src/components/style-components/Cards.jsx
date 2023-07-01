import React, { useState } from "react";
import MovieSummary from "../page-components/MovieSummary";
import { Link } from "react-router-dom";

const Cards = (props) => {
  const [active, setActive] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const handleCardClick = (cardId) => {
    setClickedCard(cardId);
  };
  const handleMouseOver = () => {
    setActive(true);
  };

  const handleMouseOut = () => {
    setActive(false);
  };
  console.log(props);
  return (
    <div>
      <Link  to={"description?id="+props.details._id}>
        <figure class="card" onClick={() => handleCardClick(props.details._id)}>
          <img src={props.details.imageUrl} />

          <figcaption>{props.details.title}</figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default Cards;
