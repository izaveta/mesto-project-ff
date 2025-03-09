const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const showError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    if (!errorElement) return;
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    if (!errorElement) return;
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

function checkValidity(formElement, inputElement, config) {
    const fieldConfig = config[inputElement.name];
    if (!fieldConfig) {
        if (!inputElement.validity.valid) {
            if (inputElement.type === 'url') {
                showError(formElement, inputElement, 'Введите адрес сайта', config);
            } else {
                showError(formElement, inputElement, inputElement.validationMessage, config);
            }
        } else {
            hideError(formElement, inputElement, config);
        }
        return;
    }

    if (!inputElement.validity.valid) {
        if (inputElement.value.length === 0) {
            showError(formElement, inputElement, 'Вы пропустили это поле', config);
        } else if (inputElement.value.length < fieldConfig.minLength) {
            showError(formElement, inputElement, `Минимальное число символов: ${fieldConfig.minLength}. Длина текста: ${inputElement.value.length}`, config);
        } else if (inputElement.value.length > fieldConfig.maxLength) {
            showError(formElement, inputElement, `Максимальное число символов: ${fieldConfig.maxLength}. Длина текста: ${inputElement.value.length}`, config);
        } else if (inputElement.type === 'url' && !inputElement.validity.valid) {
            showError(formElement, inputElement, 'Введите адрес сайта', config);
        } else {
            showError(formElement, inputElement, inputElement.validationMessage, config);
        }
    } else {
        hideError(formElement, inputElement, config);
    }
};

const toggleButtonState = (inputList, buttonElement, config) => {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, config);
    });
    toggleButtonState(inputList, buttonElement, config);
}

export { validationConfig, clearValidation, enableValidation }