import './index.css';
import { api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
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
  avatarPopupSelector,
  addCardPopupSelector,
  imagePopupSelector,
  confirmPopupSelector,
  addCardButton,
  editProfileButton,
  editAvatarButton,
  profileNameInput,
  profileDescriptionInput,
  selectorConfig,
} from '../utils/constants.js';


/** Включение валидации.
*/
const formValidators = {};
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(selectorConfig);


/** Инициализация исходных данных.
*/
const userInfo = new UserInfo(userAvatarSelector, userNameSelector, userDescriptionSelector);
let cardList = {};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList = new Section({
      items: initialCards,
      renderer: (item) => {
        const card = createCard(item, userInfo.getUserInfo());
        cardList.addItem(card);
      }
    }, cardListSelector);
    cardList.renderItems();
  })
  .catch(err => alert(err));


/** Инициализация попапов.
*/
const profilePopup = new PopupWithForm(
  profilePopupSelector,
  (evt, data) => {
    evt.preventDefault();
    profilePopup.renderLoading(true);
    api.editUserInfo(data)
      .then(response => userInfo.setUserInfo(response))
      .then(() => profilePopup.close())
      .catch(err => alert(err))
      .finally(() => profilePopup.renderLoading(false));
  },
);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  (evt, data) => {
    evt.preventDefault();
    avatarPopup.renderLoading(true);
    api.editUserAvatar(data)
      .then(response => userInfo.setUserInfo(response))
      .then(() => avatarPopup.close())
      .catch(err => alert(err))
      .finally(() => avatarPopup.renderLoading(false));
  },
);
avatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  (evt, { name, imageLink }) => {
    evt.preventDefault();
    addCardPopup.renderLoading(true);
    api.addCard(name, imageLink)
      .then(item => {
        const card = createCard(item, userInfo.getUserInfo());
        cardList.addItemFirst(card);
      })
      .then(() => addCardPopup.close())
      .catch(err => alert(err))
      .finally(() => addCardPopup.renderLoading(false));
  },
);
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const confirmPopup = new PopupWithConfirm(
  confirmPopupSelector,
  ({ cardId, item }) => {
    api.deleteCard(cardId)
      .then(() => item.remove())
      .catch(err => alert(err));
    confirmPopup.close();
  },
);
confirmPopup.setEventListeners();


/** Функции и обработчики событий.
*/
function createCard(data, userInfo) {
  const card = new Card(
    data,
    cardTemplate,
    () => imagePopup.open(data.name, data.link),
    cardId => {
      if (card.isLiked()) {
				api.deleteLike(cardId)
					.then(data => {
						card.setLikeCount(data.likes)
					})
					.catch(err => alert(err));
			} else {
				api.addLike(cardId)
					.then(data => {
						card.setLikeCount(data.likes)
					})
					.catch(err => alert(err));
			}
		},
    (cardId, item) => confirmPopup.open({ cardId, item }),
    userInfo._id,
    );
  const cardElement = card.getCard();
  return cardElement;
}

editProfileButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  formValidators.editProfile.resetValidation();
  profilePopup.open();
});

editAvatarButton.addEventListener('click', () => {
  formValidators.editAvatar.resetValidation();
  avatarPopup.open();
});

addCardButton.addEventListener('click', () => {
  formValidators.addCard.resetValidation();
  addCardPopup.open();
});
