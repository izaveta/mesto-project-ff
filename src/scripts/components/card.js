import { likeCards, unlikeCards, deleteCards } from '../components/api.js';

// Like function:

function likeClick(cardId, likeButton, likeCount) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      unlikeCards(cardId)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.error(`Ошибка при удалении лайка: ${err}`));
    } else {
      likeCards(cardId)
        .then((updatedCard) => {
            likeButton.classList.add('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.error(`Ошибка при добавлении лайка: ${err}`));
    }
  };

// Delete function:

function deleteCard(cardId, cardElement) {
    deleteCards(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`));
};

// Card creation function:

function createCard(cardData, userId, { deleteCard, likeClick, openImagePopup }) {

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCount = cardElement.querySelector('.card__like-count');

cardImage.src = cardData.link;
cardImage.alt = cardData.name;
cardTitle.textContent = cardData.name;
likeCount.textContent = cardData.likes.length;

likeButton.addEventListener('click', () => {
    likeClick(cardData._id, likeButton, likeCount);
  });

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
        deleteCard(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData);
  });

  return cardElement;
}
export { createCard, deleteCard, likeClick };