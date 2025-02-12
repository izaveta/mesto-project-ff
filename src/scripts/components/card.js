// Функция удаления карточки:

function deleteCard(element) {
    const deleteCard = element.target.closest(".card");
    deleteCard.remove();
}

// Функция лайка карточки:

function likeCard(cardLikeButton) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
}

// Функция создания карточки:

function createCard(element, { deleteCard, likeCard, openImagePopup }) {
    // Объявлены переменные:

    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");

    // Добавлен слушатель для удаления карточки:

    cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);

    // Присвоены данные карточкам:

    cardImage.src = element.link;
    cardTitle.textContent = element.name;

    // Добавлен слушатель для лайка карточки:

    cardLikeButton.addEventListener("click", function () {
        likeCard(cardLikeButton);
    });

    // Функция открытия попапа с изображением:

    cardImage.addEventListener("click", function () {
        openImagePopup(element);
    });

    return cardElement;
}

export { createCard, deleteCard, likeCard };