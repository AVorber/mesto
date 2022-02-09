import { Popup } from '../components/Popup.js';


export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => this._submitForm(evt));
  }

  close() {
    super.close();
    this._form.reset();
  }
}
