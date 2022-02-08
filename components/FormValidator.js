export class FormValidator {
  constructor(selectorConfig, formElement) {
    this._selectorConfig = selectorConfig;
    this._formElement = formElement;
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._selectorConfig.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._selectorConfig.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectorConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectorConfig.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectorConfig.inputErrorClass);
    errorElement.classList.remove(this._selectorConfig.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation() {
    this._formElement.reset();
    this._toggleButtonState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector));
    this._submitButton = this._formElement.querySelector(this._selectorConfig.submitButtonSelector);

    this._setEventListeners();
  }
}
