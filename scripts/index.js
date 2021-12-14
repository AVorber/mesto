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
  }
];

initialCards.forEach(element => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__title').textContent = element.name;
  card.querySelector('.card__image').alt = element.name;
  card.querySelector('.card__image').src = element.link;

  cards.append(card);
});

function openEditProfilePopup () {
  openPopup(editProfilePopup);
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
  closePopup(editProfilePopup);
}

function openAddCardPopup () {
  openPopup(addCardPopup);
  closePopup(addCardPopup);
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;
  editProfilePopup.classList.remove('popup_opened');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.querySelector('.popup__close-button').addEventListener(
    'click', () => popup.classList.remove('popup_opened')
  );
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfilePopup.addEventListener('submit', formSubmitHandler);

addCardButton.addEventListener('click', openAddCardPopup);
