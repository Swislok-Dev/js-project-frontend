class User {

  static all = [];

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  renderUser = () => {
    const { username, guitars} = this.data
    debugger
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
      // debugger
      const div = e.target.closest("div")
      // e.target.closest("div").remove()  FRONTEND ONLY!!
      // debugger
      User.deleteGuitar(div)
    })
  }

  static showGuitars = (guitars) => {
    let userGuitars = []
    // debugger
    for (let i = 0; i < guitars.length; i++){
      userGuitars.push(guitars[i])
      document.getElementById("user-guitars").style.display = "none"
    }
    userGuitars.forEach(User.renderUserGuitar)
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

  static deleteGuitar = (div) => {
    const deleteGuitar = document.querySelector("#delete-guitar")
    // debugger
    api.deleteGuitar(div.dataset.id)
    .then(() => div.remove())
    // deleteGuitar.addEventListener("click", (e) => {
    //   debugger
    //   api.deleteGuitar(id)
    //   console.log(id)
    // })
  }
  
}