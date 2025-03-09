// Popup opening function:

function openModal(modal) {
  modal.classList.add("popup_is-animated");
  document.addEventListener("keydown", сloseOnEsc);
  setTimeout(function () {
    modal.classList.add("popup_is-opened");
  }, 0);
}

// Popup closing function:

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", сloseOnEsc);
}

// Closing popup by pressing the button function:

function popupCloser(modal) {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closeModal(modal);
  });
}

// Closing popup clicking on overlay function:

function closeOnBackDropClick(modal) {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

// Closing popup by escape button function:

function сloseOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export { openModal, closeModal, closeOnBackDropClick, сloseOnEsc, popupCloser };