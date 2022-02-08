export const initialCards = [
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
  },
];

// Селекторы элементов.
export const cardListSelector = '.cards';
export const userNameSelector = '.profile__title';
export const userDescriptionSelector = '.profile__subtitle';
export const profilePopupSelector = '.popup_type_profile';
export const imagePopupSelector = '.popup_type_image';

// Элементы форм.
export const editProfileForm = document.forms.editProfile;
export const profileNameInput = editProfileForm.name;
export const profileDescriptionInput = editProfileForm.description;
