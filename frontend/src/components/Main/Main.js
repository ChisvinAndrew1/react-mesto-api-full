import React from "react";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onAddPlace,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__cover" onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="фотография профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
          ></button>
          <p className="profile__about-self">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
        ></button>
      </section>

      <section className="gallery page__gallery">
        {cards.map((cardData) => (
          <Card
            card={cardData}
            key={cardData._id}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
