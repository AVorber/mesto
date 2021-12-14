const editProfilePopup = document.querySelector('.popup');
const openEditProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = document.querySelector('.popup__close-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.popup__container');
const profileNameInput = editProfileForm.querySelector('.popup__name-input');
const profileDescriptionInput = editProfileForm.querySelector('.popup__description-input');

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
  editProfilePopup.classList.add('popup_opened');
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
}

function closeEditProfilePopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = profileNameInput.value;
  let description = profileDescriptionInput.value;
  profileTitle.textContent = name;
  profileSubtitle.textContent = description;
  closeEditProfilePopup();
}

openEditProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);
