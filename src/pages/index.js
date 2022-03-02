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
  addCardForm,
  editProfileForm,
  profileNameInput,
  profileDescriptionInput,
  editAvatarForm,
  avatarLinkInput,
  selectorConfig,
} from '../utils/constants.js';


const editProfileFormValidator = new FormValidator(selectorConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(selectorConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(selectorConfig, addCardForm);
addCardFormValidator.enableValidation();


/** Инициализация профиля.
*/
const userInfo = new UserInfo(userAvatarSelector, userNameSelector, userDescriptionSelector);
Promise.resolve(api.getUserInfo())
  .then(data => userInfo.setUserInfo(data))
  .catch(err => alert(err));


/** Инициализация блока карточек.
*/
let cardList = {};
Promise.resolve(api.getInitialCards())
  .then(data => {
    cardList = new Section({
      items: data,
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
    api.editUserInfo(data)
      .then(response => userInfo.setUserInfo(response))
      .catch(err => alert(err));
    profilePopup.close();
  },
);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  (evt, data) => {
    evt.preventDefault();
    api.editUserAvatar(data)
      .then(response => userInfo.setUserInfo(response))
      .catch(err => alert(err));
    avatarPopup.close();
  },
);
avatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  (evt, { name, imageLink }) => {
    evt.preventDefault();
    api.addCard(name, imageLink)
      .then(item => {
        const card = createCard(item, userInfo.getUserInfo());
        cardList.addItemFirst(card);
      })
      .catch(err => alert(err));
    addCardPopup.close();
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
  editProfileFormValidator.resetValidation();
  profilePopup.open();
});

editAvatarButton.addEventListener('click', () => {
  const { avatar } = userInfo.getUserInfo();
  avatarLinkInput.value = avatar;
  editAvatarFormValidator.resetValidation();
  avatarPopup.open();
});

addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
