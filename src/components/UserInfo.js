export class UserInfo {
  constructor(userAvatarSelector, userNameSelector, userDescriptionSelector) {
    this._avatar = document.querySelector(userAvatarSelector);
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({ avatar='', name='Жак-Ив Кусто', about='Исследователь океана' }) {
    if (avatar) {
      this._avatar.src = avatar;
    }
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
