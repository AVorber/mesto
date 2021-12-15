const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_profile');
const profileNameInput = editProfilePopup.querySelector('.popup__name-input');
const profileDescriptionInput = editProfilePopup.querySelector('.popup__description-input');

const addCardButton = document.querySelector('.card__add-button');
const addCardPopup = document.querySelector('.popup_type_card');
const cardNameInput = addCardPopup.querySelector('.popup__card-name-input');
const cardImageLinkInput = addCardPopup.querySelector('.popup__image-link-input');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const initialCards = [
  {
    name: 'Ольхон',
    link: './images/olhon.jpg'
  },
  {
    name: 'Петергоф',
    link: './images/peterhof.jpg'
  },
  {
    name: 'Никола-Ленивец',
    link: './images/nikola-lenivetc.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: './images/kabardino-balkariya.jpg'
  },
  {
    name: 'Дивноморск',
    link: './images/divnomorsk.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
];

initialCards.forEach(
  element => addCard(nameValue=element.name, imageLinkValue=element.link)
);

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function clickClosePopupButton(popup) {
  popup.querySelector('.popup__close-button').addEventListener(
    'click', () => closePopup(popup)
  );
}

function openEditProfilePopup () {
  openPopup(editProfilePopup);

  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
  editProfilePopup.addEventListener('submit', profileFormSubmitHandler);

  clickClosePopupButton(editProfilePopup);
}

function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;

  closePopup(editProfilePopup);
}

function openAddCardPopup () {
  openPopup(addCardPopup);

  addCardPopup.addEventListener('submit', cardFormSubmitHandler);

  clickClosePopupButton(addCardPopup);
}

function addCard(nameValue, imageLinkValue) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = nameValue;
  card.querySelector('.card__image').alt = nameValue;
  card.querySelector('.card__image').src = imageLinkValue;

  card.querySelector('.card__delete-button').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });

  card.querySelector('.card__favorite-button').addEventListener('click', evt => {
    evt.target.classList.toggle('card__favorite-button_active');
  });

  cards.prepend(card);
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  if (cardName && cardImageLink) {
    addCard(nameValue=cardName, imageLinkValue=cardImageLink);
    cardNameInput.value = '';
    cardImageLinkInput.value = '';
  }

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
