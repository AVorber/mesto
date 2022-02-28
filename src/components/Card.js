export class Card {
  constructor({ _id, name, link, likes }, cardSelector, handleCardClick, handleCardDelete) {
    this._cardId = _id;
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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
    this._cardDeleteButton.addEventListener('click', () =>
      this._handleCardDelete(this._cardId, this._element)
    );
    this._cardLikeButton.addEventListener('click', evt =>
        evt.target.classList.toggle('card__like-button_active')
    );
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  getCard() {
    this._element = this._getTemplate();
    this._cardDeleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikeCount = this._element.querySelector('.card__like-counter');
    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardLikeCount.textContent = this._likes;

    return this._element;
  }
}
