import { openImagePopup } from './index.js';

export class Card {
  constructor(cardSelector, name, link) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _openImageListener() {
    this._element
      .querySelector('.card__image')
      .addEventListener('click', evt => openImagePopup(this._name, this._link));
  }

  addCard() {
    this._element = this._getTemplate();
    this._openImageListener();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }
}
