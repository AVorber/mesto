import { Popup } from './Popup.js';


export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm(this._deleteItem);
    });
  }

  open (data) {
    super.open();
    this._deleteItem = data;
  }
}
