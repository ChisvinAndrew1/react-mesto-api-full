import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  //   const [value, setValue] = React.useState(currentUser);

  const [name, setName] = React.useState(currentUser?.name);
  const [description, setDescription] = React.useState(currentUser?.about);

  function handleChangeName(e) {
    setName(e.target.value);
    //   setValue({[e.target.name]: e.target.value});
    //   console.log({[e.target.name]: e.target.value})
  }

  function handleChangeDescripion(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    // setValue({name: currentUser.name,
    //             about: currentUser.about})
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    console.log({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isPopupOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          value={name || ""}
          onChange={handleChangeName}
          id="name-profile"
          name="name"
          autoComplete="off"
          placeholder="Имя и Фамилия"
          type="text"
          className="popup__input popup__input_el_name"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="name-profile-error" className="error"></span>

        <input
          value={description || ""}
          onChange={handleChangeDescripion}
          autoComplete="off"
          id="profile-about"
          name="about"
          placeholder="О себе"
          type="text"
          className="popup__input popup__input_el_about"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="profile-about-error" className="error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
