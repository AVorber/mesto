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

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', evt => evt.target.closest('.card').remove());
    this._cardLikeButton.addEventListener('click', evt =>
        evt.target.classList.toggle('card__favorite-button_active')
      );
    this._cardImage.addEventListener('click', evt => openImagePopup(this._name, this._link));
  }

  getCard() {
    this._element = this._getTemplate();
    this._cardDeleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeButton = this._element.querySelector('.card__favorite-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }
}
