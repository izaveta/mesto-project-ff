// Главный файл стилей:

import "./pages/index.css";

// Работа с окнами:

import { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser } from "./scripts/components/modal.js";

// Работа с карточками:

import { createCard, deleteCard, likeCard } from "./scripts/components/card.js";

// Темплейт карточек:

const placeList = document.querySelector(".places__list");

// Карточки:

import { initialCards } from "./scripts/cards.js";

// DOM элементы:

// Карточки:
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupOpener = document.querySelector(".profile__add-button");
const cardElement = newCardPopup.querySelector(".popup__form");
const cardNameInput = cardElement.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardElement.querySelector(".popup__input_type_url");

// Профиль:
const editPopup = document.querySelector(".popup_type_edit");
const editPopupOpener = document.querySelector(".profile__edit-button");
const formElement = editPopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Изображения:
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupOpener = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Выведение карточки на страницу:

function renderCards() {
    initialCards.forEach(function (event) {
        const card = createCard(event, { deleteCard, likeCard, openImagePopup });
        placeList.append(card);
    });
}

// Функция открытия попапа редактирования профиля:

function openEditProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(editPopup);
}
editPopupOpener.addEventListener("click", openEditProfile);

// Функция открытия попапа кликом по изображению:

function openImagePopup(element) {
    imagePopupOpener.src = element.link;
    imagePopupCaption.textContent = element.name;
    openModal(imagePopup);
}

// Функция открытия попапа добавления карточек:

function openAddCards() {
    openModal(newCardPopup);
}
newCardPopupOpener.addEventListener("click", openAddCards);

// Функция отправки формы редактирования профиля:

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(editPopup);
}
formElement.addEventListener("submit", handleFormSubmit);

// Закрытие попапа:

popupCloser(editPopup);
popupCloser(newCardPopup);
popupCloser(imagePopup);

// Закрытие попапа кликом на оверлей:

closeOnBackDropClick(editPopup);
closeOnBackDropClick(newCardPopup);
closeOnBackDropClick(imagePopup);

// Функция отправки формы добавления карточки:

function handleImageSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(
        {
            name: cardNameInput.value,
            link: cardLinkInput.value,
        },
        { deleteCard, likeCard, openImagePopup }
    );
    placeList.prepend(newCard);
    closeModal(newCardPopup);
    cardElement.reset();
}
cardElement.addEventListener("submit", handleImageSubmit);

renderCards();