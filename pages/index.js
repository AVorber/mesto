import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  initialCards,
  cardListSelector,
  userNameSelector,
  userDescriptionSelector,
  profilePopupSelector,
  addCardPopupSelector,
  imagePopupSelector,
  addCardButton,
  editProfileButton,
  addCardForm,
  editProfileForm,
  profileNameInput,
  profileDescriptionInput,
} from '../utils/constants.js';

export { selectorConfig };


const selectorConfig = {
  cardTemplate: '.card-template',
  formFieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

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


/** Инициализация попапов.
*/
const profilePopup = new PopupWithForm(
  profilePopupSelector,
  (evt, { name, description }) => {
    evt.preventDefault();
    userInfo.setUserInfo(name, description);
    profilePopup.close();
  },
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  (evt, { name, imageLink }) => {
    evt.preventDefault();
    const card = createCard(name, imageLink);
    cardList.addItemFirst(card);
    addCardPopup.close();
  },
);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();


/** Функции и обработчики событий.
*/
function createCard(name, link) {
  const card = new Card(
    name,
    link,
    selectorConfig.cardTemplate,
    () => imagePopup.open(name, link),
    );
  const cardElement = card.getCard();
  return cardElement;
}

editProfileButton.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  editProfileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
