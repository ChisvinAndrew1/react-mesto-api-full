import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatar = React.useRef(currentUser?.avatar);

  React.useEffect(() => {
    avatar.current.value = "";
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isPopupOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          ref={avatar}
          id="name-avatar"
          name="avatar"
          autoComplete="off"
          type="url"
          className="popup__input popup__input_el_avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="name-avatar-error" className="error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
