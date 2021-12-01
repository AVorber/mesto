let editProfilePopup = document.querySelector('.popup');
let openEditProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfileButton = document.querySelector('.popup__close-button');

let profieTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let editProfileForm = document.querySelector('.popup__container');
let profieTitleInput = editProfileForm.querySelector('.popup__title-input');
let profileSubtitleInput = editProfileForm.querySelector('.popup__subtitle-input');


function openEditProfilePopup () {
  editProfilePopup.classList.add('popup_opened');
  profieTitleInput.value = profieTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function closeEditProfilePopup () {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let title = profieTitleInput.value;
  let subtitle = profileSubtitleInput.value;
  profieTitle.textContent = title;
  profileSubtitle.textContent = subtitle;
  closeEditProfilePopup();
}

openEditProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);
