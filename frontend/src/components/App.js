import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import PopupWithImage from "./PopupWithImage/PopupWithImage";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoToolTip from "./InfoTooltip/InfoTooltip";
import info_ok from "../../src/images/info-ok.jpg";
import info_err from "../../src/images/info-err.jpg";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoPopup, setInfoPopup] = useState({});
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    if (loggedIn) {
      api.getDefaultData()
      .then((data) => {
        const [userData, cardList] = data;
        setCurrentUser(userData);
        setCards(cardList.reverse());
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);
   


  React.useEffect(() => {
    // const jwt = localStorage.getItem("jwt");
    // if (jwt) {
      auth
        .getContent()
        .then((res) => {
          if (res) {
            console.log(res)

            setEmail(res.data.email);
            // console.log(res)
            setLoggedIn(true);
            history.push("/");
          // } else {
          //   localStorage.removeItem(jwt);
          }
        })
        .catch((err) => console.log(err));
    // }
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.checkDateLike(!isLiked, card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(User) {
    api
      .editInfo({ name: User.name, about: User.about })
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar({ avatar })
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleLogOut() {
    // localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleRegistration(data) {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          console.log(res);
          setIsTooltipPopupOpen(true);
          setInfoPopup({
            message: "Вы успешно зарегистрировались!",
            img: info_ok,
          });
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setInfoPopup({
          message: "Что-то пошло не так! Попробуйте еще раз.",
          img: info_err,
        });
      });
  }
  function handleAuth(data) {
    auth
      .authorize(data)
      .then((res) => {
        // localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(res.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setInfoPopup({
          message: "Что-то пошло не так! Попробуйте еще раз.",
          img: info_err,
        });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={email} onLogOut={handleLogOut} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              {/* <Route path='/'> */}
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
              {/* </Route> */}
            </ProtectedRoute>

            <Route path="/sign-up">
              <Register handleRegister={handleRegistration} />
            </Route>
            <Route path="/sign-in">
              <Login onSubmit={handleAuth} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            textButton="Да"
            isPopupOpen={false}
            onClose={closeAllPopups}
          />

          <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

          <InfoToolTip
            name="info"
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            info={infoPopup}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
