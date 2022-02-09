import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();

    const popupImage = document.querySelector('.popup__image');
    const popupImageTitle = document.querySelector('.popup__image-title');

    popupImageTitle.textContent = name;
    popupImage.alt = link;
    popupImage.src = link;
  }
}
