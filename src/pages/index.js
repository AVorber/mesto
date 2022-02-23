import './index.css';
import { api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  cardTemplate,
  cardListSelector,
  userAvatarSelector,
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
  selectorConfig,
} from '../utils/constants.js';


const editProfileFormValidator = new FormValidator(selectorConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm);
addCardFormValidator.enableValidation();


/** Инициализация блока карточек.
*/
let cardList = {};
Promise.resolve(api.getInitialCards())
  .then(data => {
    cardList = new Section({
      items: data,
      renderer: (item) => {
        const card = createCard(item.name, item.link);
        cardList.addItem(card);
      }
    }, cardListSelector);
    cardList.renderItems();
  })
  .catch(err => alert(err));


/** Инициализация профиля.
*/
const userInfo = new UserInfo(userAvatarSelector, userNameSelector, userDescriptionSelector);
Promise.resolve(api.getUserInfo())
  .then(data => userInfo.setUserInfo(data))
  .catch(err => alert(err));


/** Инициализация попапов.
*/
const profilePopup = new PopupWithForm(
  profilePopupSelector,
  (evt, data) => {
    evt.preventDefault();
    api.editUserInfo(data)
      .then(response => userInfo.setUserInfo(response))
      .catch(err => alert(err));
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
    cardTemplate,
    () => imagePopup.open(name, link),
    );
  const cardElement = card.getCard();
  return cardElement;
}

editProfileButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  editProfileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
