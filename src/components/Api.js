class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers,
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(`Ошибка: ${response.status}`)
        })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(`Ошибка: ${response.status}`)
        })
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'e56ed49e-4783-4855-bf06-8b5123eda847',
    'Content-Type': 'application/json',
  }
});
