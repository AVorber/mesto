let editProfilePopup = document.querySelector('.popup');
let openEditProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfileButton = document.querySelector('.popup__close-button');

let profieTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let editProfileForm = document.querySelector('.popup__container');
let profieNameInput = editProfileForm.querySelector('.popup__name-input');
let profileDescriptionInput = editProfileForm.querySelector('.popup__description-input');


function openEditProfilePopup () {
  editProfilePopup.classList.add('popup_opened');
  profieNameInput.value = profieTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
}

function closeEditProfilePopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = profieNameInput.value;
  let description = profileDescriptionInput.value;
  profieTitle.textContent = name;
  profileSubtitle.textContent = description;
  closeEditProfilePopup();
}

openEditProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);
