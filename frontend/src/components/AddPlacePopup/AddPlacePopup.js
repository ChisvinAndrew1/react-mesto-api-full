import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const place = React.useRef("");
  const link = React.useRef("");

  React.useEffect(() => {
    place.current.value = "";
    link.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      place: place.current.value,
      link: link.current.value,
    });
  }

  return (
    <PopupWithForm
      name="gallery"
      title="Новое место"
      textButton="Создать"
      isPopupOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          id="name-gallery"
          autoComplete="off"
          ref={place}
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          name="place"
          className="popup__input popup__input_el_name-gallery"
          required
        />
        <span id="name-gallery-error" className="error"></span>

        <input
          id="sourse-gallery"
          autoComplete="off"
          ref={link}
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          className="popup__input popup__input_el_source"
          required
        />
        <span id="sourse-gallery-error" className="error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
