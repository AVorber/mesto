import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  cardListSelector,
  profilePopupSelector,
  imagePopupSelector,
  editProfileForm,
  profileNameInput,
  profileDescriptionInput,
  userNameSelector,
  userDescriptionSelector,
  initialCards,
} from '../utils/constants.js';

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

const editProfileButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_card');
const addCardForm = document.forms.addCard;
const cardNameInput = addCardForm.name;
const cardImageLinkInput = addCardForm.imageLink;

const editProfileFormValidator = new FormValidator(selectorConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm);
addCardFormValidator.enableValidation();


/** Инициализация блока карточек.
*/
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    cardList.addItem(card);
  }
}, cardListSelector);
cardList.renderItems();


/** Инициализация профиля.
*/
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);
userInfo.setUserInfo();


const profilePopup = new Popup(profilePopupSelector);
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

function editProfileFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo(profileNameInput.value, profileDescriptionInput.value);

  profilePopup.close();
}

function openImagePopup(name, link) {
  imagePopup.open(name, link);
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

  cardList.addItemFirst(card);

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', () => profilePopup.open());
editProfileForm.addEventListener('submit', editProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  addCardFormValidator.resetValidation();
});
addCardForm.addEventListener('submit', addCardFormSubmit);
