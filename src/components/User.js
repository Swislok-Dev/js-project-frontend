class User {

  static all = [];
  static main = document.getElementById("main");

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  renderUser = () => {
    const { username, guitars} = this.data
    document.getElementById("header-2").innerHTML = "Account Info"
    document.getElementById("user-container").innerHTML += `
    <div class="show-user">
      <h3>Username: ${username}</h3>
      <button id="user-guitars">Show Guitars</button>
    </div>`
    const userGuitarsBtn = document.querySelector("button#user-guitars")
    userGuitarsBtn.addEventListener("click", () => {
      User.showGuitars(guitars)
    })
  }

  static renderUserGuitar = (guitar) => {
    const { brand, model } = guitar
    document.getElementById("user-container").innerHTML += `
    <div class="guitar-container">
      <h4>${brand} ${model}</h3>
      <button>Delete this guitar</button>
    </div>
    `
  }

  static showGuitars = (guitars) => {
    let userGuitars = []
    for (let i = 0; i < guitars.length; i++){
      userGuitars.push(guitars[i])
      document.getElementById("user-guitars").style.display = "none"
    }
    userGuitars.forEach((guitar) => User.renderUserGuitar(guitar))
  }

  static getUsers = () => {
    api.getUsers().then(users => {
      users.forEach(user => new User(user))
    })
  }

  static find = (id) => this.all.find(user => user.data.id === id)

  static showUser = (user) => {
    const main = document.getElementById("main");
    main.innerHTML = ""
    const userContainer = document.createElement("div")
    userContainer.id = "user-container"
    main.appendChild(userContainer)
    this.find(user.id).renderUser()
  }

  static deleteGuitar = (id) => {
    const deleteGuitar = document.querySelector("#delete-guitar")
    deleteGuitar.addEventListener("click", (e) => {
      debugger
      api.deleteGuitar(id)
      console.log(e.target)
    })
  }
  
}