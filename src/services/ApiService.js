class ApiService {
  constructor(api) {
    this.api = api
  }

  
  
  getGuitars = () => {
    return fetch(this.api + "/guitars")
    .then(response => response.json())
  }

  getUsers = () => {
    return fetch(this.api + "/users")
    .then(response => response.json())
  }
  
  createGuitar = (post) => {
    post.user_id = user.id
    return fetch(this.api + "/guitars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
  }
  
  findOrCreateUser = (username) => {
    return fetch(this.api + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username}),
    })
    .then(response => response.json())
  }

  showUser = (user) => {
    return fetch(this.api + `/users/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
  }

  deleteGuitar = (guitar) => {
    return fetch(this.api + `/guitars/${guitar.id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => guitar.remove())
  }
}