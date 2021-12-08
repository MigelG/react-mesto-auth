import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //Получение карточек при монтировании
  useEffect(() => {
    api.getCardList()
      .then(data => {
        console.log(data);
        setCards(data);
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }, []);

  //Получение информации о пользователе при монтировании
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }, []);

  //Функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card.id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.id));
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Функция закрытия попапа при нажатии на бэк
  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  //Состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsBigImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsBigImagePopupOpen(false);
  }

  //Обновление информации о пользователе
  function handleUpdateUser(user) {
    api.saveUserInfo(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Обновление аватара
  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Добавление новой карточки
  function handleAddPlace(card) {
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Что-то пошло не так: ${res.statusText}`);
      });
  }

  //Закрытие попапов на Esc
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isBigImagePopupOpen) {

      function handleEsc(event) {
        if (event.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc)

      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isBigImagePopupOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onImagePopup={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onAddPlace={handleAddPlace} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onPopupClick={handlePopupClick}
            onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isBigImagePopupOpen}
            onPopupClick={handlePopupClick} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;