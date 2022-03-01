export class Card {
  constructor(
    { _id, name, link, likes, owner },
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleCardDelete,
    userId,
    ) {
      this._cardId = _id;
      this._name = name;
      this._link = link;
      this._likes = likes;
      this._cardOwnerId = owner._id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleCardDelete = handleCardDelete;
      this._userId = userId;
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
    this._cardLikeButton.addEventListener('click', () =>
      this._handleLikeClick(this._cardId)
    );
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  isLiked() {
    return  !!(this._likes.some(like => like._id === this._userId))
  }

  setLikeCount(likes) {
    this._likes = likes;
		this._cardLikeCount.textContent = this._likes.length;
		if (this.isLiked()) {
		  this._cardLikeButton.classList.add('card__like-button_active')
		} else {
		  this._cardLikeButton.classList.remove('card__like-button_active')
		}
	}

  getCard() {
    this._element = this._getTemplate();
    this._cardDeleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikeCount = this._element.querySelector('.card__like-counter');

    this._setEventListeners();
    this.setLikeCount(this._likes);

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    if (this._userId !== this._cardOwnerId) {
      this._cardDeleteButton.remove();
    }

    return this._element;
  }
}
