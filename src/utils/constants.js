// вебпак добавит в переменные правильные пути
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const divnomorsk = new URL('../images/divnomorsk.jpg', import.meta.url);
const kabardinoBalkariya = new URL('../images/kabardino-balkariya.jpg', import.meta.url);
const nikolaLenivetc = new URL('../images/nikola-lenivetc.jpg', import.meta.url);
const peterhof = new URL('../images/peterhof.jpg', import.meta.url);
const olhon = new URL('../images/olhon.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Дивноморск',
    link: divnomorsk
  },
  {
    name: 'Кабардино-Балкария',
    link: kabardinoBalkariya
  },
  {
    name: 'Никола-Ленивец',
    link: nikolaLenivetc
  },
  {
    name: 'Петергоф',
    link: peterhof
  },
  {
    name: 'Ольхон',
    link: olhon
  },
];

// Селекторы элементов.
export const cardTemplate = '.card-template';
export const cardListSelector = '.cards';
export const userAvatarSelector = '.profile__avatar';
export const userNameSelector = '.profile__title';
export const userDescriptionSelector = '.profile__subtitle';
export const profilePopupSelector = '.popup_type_profile';
export const avatarPopupSelector = '.popup_type_avatar';
export const addCardPopupSelector = '.popup_type_card';
export const imagePopupSelector = '.popup_type_image';
export const confirmPopupSelector = '.popup_type_confirm';

// Элементы форм.
export const addCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__avatar-container');
export const addCardForm = document.forms.addCard;
export const editProfileForm = document.forms.editProfile;
export const profileNameInput = editProfileForm.name;
export const profileDescriptionInput = editProfileForm.about;
export const editAvatarForm = document.forms.editAvatar;
export const avatarLinkInput = editAvatarForm.avatarLink;

// Набор селекторов для валидации полей
export const selectorConfig = {
  formFieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};
