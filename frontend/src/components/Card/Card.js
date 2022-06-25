import React from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "" : "card__trash_inactive"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
    // onCardClick(card);
  }

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `card__stroke ${
    isLiked ? "card__stroke_active" : ""
  }`;

  return (
    <article className="card">
      <img
        className="card__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <button
        type="button"
        onClick={handleDelete}
        className={cardDeleteButtonClassName}
      ></button>
      <h3 className="card__el-title">{card.name}</h3>
      <div className="card__el-stroke">
        <button
          type="button"
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
        ></button>
        <p className="card__sum-stroke">{card.likes.length}</p>
      </div>
    </article>
  );
}

export default Card;
