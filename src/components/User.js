class User {

  static all = [];
  static main = document.getElementById("main");

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  renderUser = () => {
    const { username, guitars} = this.data
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

  static showGuitars = (guitars) => {
    return guitars.forEach(guitar => {
      document.getElementById("user-container").innerHTML += `
      <h3>Guitar: ${guitar.brand} ${guitar.model}</h3><br>`
      document.getElementById("user-guitars").innerText = "Hide Guitars"
    })
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
    const account = document.getElementById("account-button")
    // const user = this.find()
    main.appendChild(userContainer)
    this.find(user.id).renderUser()
    // account.addEventListener("click", console.log(this))
    // this.find(user.id).renderUser()
    // this.all.filter(users => {
    //   debugger
    //   console.log(this.all)
    //   user = user.username === this.user.username
    //   renderUser()
    // })
  }

  
}