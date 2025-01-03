// @todo: Темплейт карточки
const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки

function addCard(element, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(element) {
    const deleteCard = element.target.closest('.card');
    deleteCard.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
    const card = addCard(element, deleteCard);
    placeList.append(card);
});
