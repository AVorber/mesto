export class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
    }

  getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
}
