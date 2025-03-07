// Стили:

import "./pages/index.css";

// Окна:

import { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser } from "./scripts/components/modal.js";

// Карточки:

import { createCard, deleteCard, likeClick } from "./scripts/components/card.js";

// Темплейт карточек:

const placeList = document.querySelector(".places__list");

// Карточки:

// import { initialCards } from "./scripts/cards.js";

// Валидация:

import { validationConfig, clearValidation, enableValidation } from './scripts/components/validation.js';

// API:

import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCards, likeCards, unlikeCards, updateAvatar } from './scripts/components/api.js';

// Карточки:

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupOpener = document.querySelector(".profile__add-button");
const cardForm = newCardPopup.querySelector(".popup__form");
const popupNameInput = cardForm.querySelector(".popup__input_type_card-name");
const popupLinkInput = cardForm.querySelector(".popup__input_type_url");
const newCardPopupButton = cardForm.querySelector('.popup__button');

// Профиль:

const editPopup = document.querySelector(".popup_type_edit");
const editPopupOpener = document.querySelector(".profile__edit-button");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const editPopupButton = editForm.querySelector('.popup__button');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Изображения:

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupOpener = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Аватар:

const avatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar-url")
const avatarButton = avatarForm.querySelector('.popup__button');

// Пользовательское ID:

let userId;

// Функция открытия попапа кликом по изображению:

function openImagePopup(cardData) {
    imagePopupOpener.src = cardData.link;
    imagePopupOpener.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
} 

// Рендеринг карточек (вот тут поменять)
function renderCards(cards) { 
    cards.forEach((cardData) => { 
      const cardElement = createCard(cardData, userId, { deleteCard, likeClick, openImagePopup }); 
      placeList.append(cardElement); 
    }); 
  } 

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cards]) => {
  userId = userData._id;
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  avatar.style.backgroundImage = `url(${userData.avatar})`;

  renderCards(cards);
})
.catch((err) => console.error(`Ошибка при загрузке данных: ${err}`));


// Функция открытия попапа редактирования профиля:

function openEditProfile() {
    clearValidation(editForm, validationConfig);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(editPopup);
}
editPopupOpener.addEventListener("click", openEditProfile);

// Закрытие попапа:

popupCloser(editPopup);
popupCloser(newCardPopup);
popupCloser(imagePopup);
popupCloser(avatarPopup); 

// Закрытие попапа кликом на оверлей:

closeOnBackDropClick(editPopup);
closeOnBackDropClick(newCardPopup);
closeOnBackDropClick(imagePopup);
closeOnBackDropClick(avatarPopup); 

// Функция отправки формы редактирования профиля:

editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    editPopupButton.textContent = 'Сохранение...'
    updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    closeModal(editPopup);
})
.catch((err) => console.error(`Ошибка при обновлении профиля: ${err}`))
.finally(() => {
    editPopupButton.textContent = 'Сохранить';
})
});

// Функция открытия попапа добавления карточек:

function openAddCards() {
    openModal(newCardPopup);
}
newCardPopupOpener.addEventListener("click", openAddCards);

// Функция отправки формы добавления карточки:

cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    newCardPopupButton.textContent = 'Сохранение...';
    addNewCard(popupNameInput.value, popupLinkInput.value)
    .then((cardData) => {
    const newCard = createCard(cardData, userId,
        { deleteCard, likeClick, openImagePopup });
    placeList.prepend(newCard);
    closeModal(newCardPopup);
    cardForm.reset();
})
.catch((err) => console.error(`Ошибка при добавлении карточки: ${err}`))
.finally(() => {
    newCardPopupButton.textContent = 'Сохранить'
})
});

// Открытие попапа редактирования аватара
function openAvatarPopup() {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
    };

// Обработчик аватара

avatar.addEventListener('click', openAvatarPopup);

avatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    avatarButton.textContent = 'Сохранение...';

updateAvatar(avatarInput.value)
    .then((userData) => {
        avatar.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(avatarPopup);
        avatarForm.reset();
    })
    .catch((err) => console.error(`Ошибка при обновлении аватара: ${err}`))
    .finally(() => {
        avatarButton.textContent = 'Сохранить';
    });
});

/// Включение валидации
enableValidation(validationConfig);