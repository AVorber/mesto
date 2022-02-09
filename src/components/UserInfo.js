export class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._name = document.querySelector(userNameSelector);
    this._description = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    }
  }

  setUserInfo(name='Жак-Ив Кусто', description='Исследователь океана') {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
