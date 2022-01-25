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


/** Инициализация блока карточек и профиля.
*/
initialCards.forEach(
  element => cards.append(new Card(selectorConfig.cardTemplate, element.name, element.link).addCard())
);

const initialProfile = (name, description) => {
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
};
initialProfile(profileTitle.textContent, profileSubtitle.textContent);


/** Включение валидации форм.
*/
new FormValidator(selectorConfig, editProfileForm).enableValidation();
new FormValidator(selectorConfig, addCardForm).enableValidation();


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

function addCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardImageLink = cardImageLinkInput.value;
  const card = new Card(selectorConfig.cardTemplate, cardName, cardImageLink).addCard();
  const buttonElement = addCardForm.querySelector('.popup__save-button');

  cards.prepend(card);
  addCardForm.reset();
  buttonElement.classList.add('popup__save-button_inactive');
  buttonElement.disabled = true;

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', () => openPopup(editProfilePopup));
editProfileForm.addEventListener('submit', editProfileFormSubmit);

addCardButton.addEventListener('click', () => openPopup(addCardPopup));
addCardForm.addEventListener('submit', addCardFormSubmit);

closeButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
});

editProfilePopup.addEventListener('click', handleMousedown);
addCardPopup.addEventListener('click', handleMousedown);
imagePopup.addEventListener('click', handleMousedown);


/** Обработка событий нажатия на кнопки лайк и удалить карточку при помощи всплытия и делегирования,
 * как альтернатива обработки этих же событий в классе Card для каждой карточки.
*/
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
