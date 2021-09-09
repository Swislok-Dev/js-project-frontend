class ApiService {
  constructor(api) {
    this.api = api
  }

  getUsers = () => {
    return fetch(this.api + "/users")
    .then(response => response.json())
  }


  getGuitars = () => {
    return fetch(this.api + "/guitars")
    .then(response => response.json())
  }
  newPost = (post) => {
    return fetch(this.api + "/guitars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
  }
}