// Функция открытия попапа:

function openModal(modal) {
    modal.classList.add("popup_is-animated");
    document.addEventListener("keydown", сloseOnEsc);
    setTimeout(function () {
        modal.classList.add("popup_is-opened");
    }, 0);
}

// Функция закрытия попапа:

function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", сloseOnEsc);
}

// Функция закрытия попапа кликом на оверлей:

function closeOnBackDropClick(modal) {
    modal.addEventListener("click", function (evt) {
        if (evt.target === modal) {
            closeModal(modal);
        }
    });
}

// Функция закрытия попапа кнопкой escape:

function сloseOnEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

// Функция закрытия попапа по кнопке:

function popupCloser(modal) {
    const closeButton = modal.querySelector(".popup__close");
    closeButton.addEventListener("click", function () {
        closeModal(modal);
    });
}

export { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser };