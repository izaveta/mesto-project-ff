// Функция открытия попапа:

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', сloseOnEsc);
};

// Функция закрытия попапа:

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', сloseOnEsc);
};

// Функция закрытия попапа кликом на оверлей:

function closeOnBackDropClick(modal) {
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
            closeModal(modal);
        }
    });
};

// Функция закрытия попапа кнопкой escape:

function сloseOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
};

// Функция закрытия модального окна:

function popupCloser(modal) {
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(modal));
};

export { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser };