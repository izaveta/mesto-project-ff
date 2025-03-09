const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33",
  headers: { authorization: "e58f1dda-4f06-4d30-81fa-675705c777a7", "Content-Type": "application/json" },
};

// Server response verification function:

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Getting user data function:

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    checkResponse
  );
};

// Getting list of cards function:

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    checkResponse
  );
};

// Updating user's avatar function:

export const updateAvatar = (avatarUrl) => {
  const validUrlPattern =
    /^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
  if (!validUrlPattern.test(avatarUrl)) {
    return Promise.reject("Неверный формат URL аватара.");
  }

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);
};

// Adding new card function:

export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then(checkResponse);
};

// Updating user data function:

export const updateUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

// Like card function:

export function likeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Delete like card function:

export function unlikeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Card delete function:

export const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}