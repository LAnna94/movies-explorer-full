class MoviesApi {
  constructor (options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }
  }

  getMovies(data) {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  }
}

export const moviesApi = new MoviesApi({
  url:"https://api.nomoreparties.co/beatfilm-movies",
  header: {
    "content-type": "application/json",
    "Authorization": ""
  }
})
