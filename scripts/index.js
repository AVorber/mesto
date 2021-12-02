let editProfilePopup = document.querySelector('.popup');
let openEditProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfileButton = document.querySelector('.popup__close-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let editProfileForm = document.querySelector('.popup__container');
let profileNameInput = editProfileForm.querySelector('.popup__name-input');
let profileDescriptionInput = editProfileForm.querySelector('.popup__description-input');


function openEditProfilePopup () {
  editProfilePopup.classList.add('popup_opened');
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileSubtitle.textContent;
}

function closeEditProfilePopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = profileNameInput.value;
  let description = profileDescriptionInput.value;
  profileTitle.textContent = name;
  profileSubtitle.textContent = description;
  closeEditProfilePopup();
}

openEditProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);
