class User {

  static all = [];

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  renderUser = () => {
    api.findOrCreateUser(user.username).then(userData => user = userData)
    const header2 = document.getElementById("header-2")
    header2.innerHTML = "Account Info<br>"
    header2.innerHTML += `<button id="back-button">Go Back</button>`
    document.getElementById("back-button").addEventListener("click", Guitar.getGuitars)
  
    document.getElementById("user-container").innerHTML += `
    <div class="show-user">
      <h3>Username: ${user.username}</h3>
      <button id="user-guitars">Show Guitars</button>
    </div>`
    const userGuitarsBtn = document.querySelector("button#user-guitars")
    userGuitarsBtn.addEventListener("click", () => {
      User.showGuitars(user.guitars)
    })
  }

  static renderUserGuitar = (guitar) => {
    const { brand, model } = guitar
    const div = document.createElement("div")
    div.classList.add("guitar-container")
    div.setAttribute("data-id", `${guitar.id}`)
    div.innerHTML += `
    <h4>${brand} ${model}</h4>
    `
    const deleteGuitarButton = document.createElement("button")
    deleteGuitarButton.id = "delete-guitar"
    deleteGuitarButton.innerText = "Delete this guitar"

    div.appendChild(deleteGuitarButton)
    document.getElementById("user-container").appendChild(div)

    deleteGuitarButton.addEventListener("click", (e) => {
      const div = e.target.closest("div")

      User.deleteGuitar(div)
    })
  }

  static showGuitars = (guitars) => {
    let userGuitars = []
    guitars.forEach(guitar => {
      userGuitars.push(guitar)
    })
    document.getElementById("user-guitars").style.display = "none"
    userGuitars.forEach(User.renderUserGuitar)
  }

  static getUsers = () => {
    api.getUsers().then(users => {
      return users.forEach(user => new User(user))
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

  static deleteGuitar = (div) => {
    api.deleteGuitar(div.dataset.id)
    .then(() => div.remove())
  }
  
}