import { Card } from './Card.js';
import { initialCards } from './data.js';
import { FormValidator } from './FormValidator.js';

export { selectorConfig, openImagePopup };


const selectorConfig = {
  cardTemplate: '.card-template',
  formFieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

const popups = document.querySelectorAll('.popup');

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

const cards = document.querySelector('.cards');

const editProfileFormValidator = new FormValidator(selectorConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm);
addCardFormValidator.enableValidation();


/** Инициализация блока карточек и профиля.
*/
initialCards.forEach(
  element => cards.append(createCard(element.name, element.link))
);

const initialProfile = (name, description) => {
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
};
initialProfile(profileTitle.textContent, profileSubtitle.textContent);


function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydown);
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;

  closePopup(editProfilePopup);
}

function openImagePopup(name, link) {
  popupImageTitle.textContent = name;
  popupImage.alt = link;
  popupImage.src = link;

  openPopup(imagePopup);
}

function createCard(name, link) {
  const card = new Card(selectorConfig.cardTemplate, name, link);
  const cardElement = card.getCard();
  return cardElement;
}

function addCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  const card = createCard(cardName, cardImageLink);

  cards.prepend(card);

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', () => openPopup(editProfilePopup));
editProfileForm.addEventListener('submit', editProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  addCardFormValidator.resetValidation();
});
addCardForm.addEventListener('submit', addCardFormSubmit);

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
});
