import { Popup } from './Popup.js';


export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputValues = this._form.querySelectorAll('.popup__field');
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const result = {};
    this._inputValues.forEach(item => result[item.name] = item.value);
    return result
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      const data = this._getInputValues();
      this._submitForm(evt, data)
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
