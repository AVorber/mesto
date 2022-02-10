import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
  }

  open(name, link) {
    super.open();
    this._popupImageTitle.textContent = name;
    this._popupImage.alt = link;
    this._popupImage.src = link;
  }
}
