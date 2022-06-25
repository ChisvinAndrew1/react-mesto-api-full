import React from "react";

function PopupWithImage({ onClose, card }) {
  return (
    <section
      className={`popup popup_type_image ${card ? "popup_is-open" : ""}`}
    >
      <div className="popup__container popup__container_type_image">
        <div className="popup__container popup__container_type_image">
          <button
            type="button"
            className="popup__close popup__close_el_image"
            onClick={onClose}
          ></button>
          <img src={card?.link} alt={card?.name} className="popup__image" />
          <p className="popup__text">{card?.name}</p>
        </div>
      </div>
    </section>
  );
}

export default PopupWithImage;
