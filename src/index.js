// Импорт главного файла стилей:

import './pages/index.css';

// Карточки:

import {initialCards} from './scripts/cards.js';

// Функции для работы с окнами:

import { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser } from './scripts/components/modal.js';

// Темплейт карточки:
const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы:

// DOM элементы:

const editPopup = document.querySelector('.popup_type_edit');
const editPopupOpener = document.querySelector('.profile__edit-button');

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupOpener = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupOpener = document.querySelector('.popup__image');

// Функция создания карточки:

function createCard(element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
};

// Функция удаления карточки:

function deleteCard(element) {
    const deleteCard = element.target.closest('.card');
    deleteCard.remove();
};

// Выведение карточки на страницу:

initialCards.forEach(function (event) {
    const card = createCard(event, deleteCard);
    placeList.append(card);
});

// Открытие попапа редактирования профиля:

editPopupOpener.addEventListener('click', () => {
    openModal(editPopup);
});

// Открытие попапа добавления карточки:

newCardPopupOpener.addEventListener('click', () => {
    openModal(newCardPopup);
});

// Закрытие попапа:

popupCloser(editPopup);
popupCloser(newCardPopup);
popupCloser(imagePopup);

// Закрытие попапа кликом на оверлей:

closeOnBackDropClick(editPopup);
closeOnBackDropClick(newCardPopup);
closeOnBackDropClick(imagePopup);

// Функция, которая обрабатывает клик по изображению:

function imageOpen () {
    
};