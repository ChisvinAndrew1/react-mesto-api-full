import React from "react";

function PopupWithForm({
  name,
  children,
  title,
  textButton,
  isPopupOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${
        isPopupOpen ? "popup_is-open" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_el_${name}`}
          name={`popup-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className="popup__sumbit">
            {textButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
