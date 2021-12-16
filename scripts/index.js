const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_profile');
const profileNameInput = editProfilePopup.querySelector('.popup__name-input');
const profileDescriptionInput = editProfilePopup.querySelector('.popup__description-input');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_card');
const cardNameInput = addCardPopup.querySelector('.popup__card-name-input');
const cardImageLinkInput = addCardPopup.querySelector('.popup__image-link-input');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-title');

const closeButtons = document.querySelectorAll('.popup__close-button');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const initialCards = [
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
    {
    name: 'Дивноморск',
    link: './images/divnomorsk.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: './images/kabardino-balkariya.jpg'
  },
  {
    name: 'Никола-Ленивец',
    link: './images/nikola-lenivetc.jpg'
  },
  {
    name: 'Петергоф',
    link: './images/peterhof.jpg'
  },
  {
    name: 'Ольхон',
    link: './images/olhon.jpg'
  },
];

initialCards.forEach(
  element => cards.append(addCard(nameValue = element.name, imageLinkValue = element.link))
);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  openPopup(editProfilePopup);

  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;

  closePopup(editProfilePopup);
}

function openImagePopup(image, imageTitle) {
  popupImageTitle.textContent = imageTitle;
  popupImage.alt = imageTitle;
  popupImage.src = image;

  openPopup(imagePopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function addCard(nameValue, imageLinkValue) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardFavoriteButton = card.querySelector('.card__favorite-button');

  cardTitle.textContent = nameValue;
  cardImage.alt = nameValue;
  cardImage.src = imageLinkValue;

  cardImage.addEventListener('click', evt => {
    openImagePopup(image = imageLinkValue, imageTitle = nameValue)
  });

  cardDeleteButton.addEventListener('click', evt => evt.target.closest('.card').remove());

  cardFavoriteButton.addEventListener('click', evt =>
    evt.target.classList.toggle('card__favorite-button_active')
  );

  return card
}

function addCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  if (cardName && cardImageLink) {
    const card = addCard(nameValue = cardName, imageLinkValue = cardImageLink);
    cards.prepend(card);
    cardNameInput.value = '';
    cardImageLinkInput.value = '';
  }

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', editProfileFormSubmit);

addCardButton.addEventListener('click', openAddCardPopup);
addCardPopup.addEventListener('submit', addCardFormSubmit);

closeButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});
