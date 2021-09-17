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

  deleteGuitar = (id) => {
    return fetch(this.api + `/guitars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      boolean: true,
    })
    .then(response => response.json())
    .then(console.log)
    // .then(() => {debugger})
    // .then(() => guitar.remove())
    .catch(err => console.log(err));
  }
}