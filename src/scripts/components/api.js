const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: { authorization: 'e58f1dda-4f06-4d30-81fa-675705c777a7', 'Content-Type': 'application/json' }
};

// Функция проверки ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция для получения данных о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
      .then(checkResponse);
};

// Функция для получения списка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
      .then(checkResponse);
};

// Функция для обновления данных пользователя
export const updateUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(userData)
  }).then(checkResponse);
};

// Функция для обновления аватара пользователя
export const updateAvatar = (avatarUrl) => {
  const validUrlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
  if (!validUrlPattern.test(avatarUrl)) {
      return Promise.reject("Неверный формат URL аватара.");
  }

  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl })
  }).then(checkResponse);
};

// Функция для добавления новой карточки
export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(cardData)
  }).then(checkResponse);
};

// Функция для удаления карточки
export const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  }).then(checkResponse);
};

// Лайк карточки
export function likeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
};

// Удаление лайка карточки
export function unlikeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

