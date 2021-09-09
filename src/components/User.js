class User {

  static all = [];

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  renderShowUser = () => {
    const { username, email } = this.data
    document.getElementById("main").innerHTML = `
    <div class="show">
      <p>Username: ${username}</p>
      <p>Email: ${email}</p>
    </div>`
  }

  static getUsers = () => {
    api.getUsers().then(users => {
      users.forEach(user => new User(user))
    })
  }

  
}