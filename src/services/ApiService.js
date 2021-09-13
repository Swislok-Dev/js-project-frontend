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
    // if (username === undefined || username === null) {
    //   return
    // }
    return fetch(this.api + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username}),
    })
    .then(response => response.json())
  }
}