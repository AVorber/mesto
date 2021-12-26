const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_profile');
const editProfileForm = document.forms.editProfile;
const profileNameInput = editProfileForm.name;
const profileDescriptionInput = editProfileForm.description;

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_card');
const addCardForm = document.forms.addCard;
const cardNameInput = addCardForm.name;
const cardImageLinkInput = addCardForm.imageLink;

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

function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleMousedown(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', handleMousedown);
  document.addEventListener('keydown', handleKeydown);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', handleMousedown);
  document.removeEventListener('keydown', handleKeydown);
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

  cardTitle.textContent = nameValue;
  cardImage.alt = nameValue;
  cardImage.src = imageLinkValue;

  cardImage.addEventListener('click', evt => {
    openImagePopup(image = imageLinkValue, imageTitle = nameValue)
  });

  return card
}

function addCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  if (cardName && cardImageLink) {
    const card = addCard(nameValue = cardName, imageLinkValue = cardImageLink);
    cards.prepend(card);
    addCardForm.reset();
  }

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', editProfileFormSubmit);

addCardButton.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', addCardFormSubmit);

closeButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});

cards.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__favorite-button')) {
    evt.target.classList.toggle('card__favorite-button_active');
  }
});

cards.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }
});
