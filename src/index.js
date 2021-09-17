const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user
const main = document.getElementById("main")


createUsernameForm()


document.querySelector("form").addEventListener("submit", handleUsernameSubmit)

function createUsernameForm() {
  main.innerHTML =`
  <form>
  <label for="username">Username</label><br>
  <input type="text" id="username" name="username"><br>
  <input type="submit" value="Submit">
  </form>
  `
}

function handleUsernameSubmit(e) {
  e.preventDefault()
  const regex = /^[A-Za-z0-9-_]+$/;
  if (e.target.username.value.match(regex)) {
    api.findOrCreateUser(e.target.username.value).then(userData => {
      user = userData
      document.getElementById("account-button").style.display = "grid"
      document.getElementById("header-2").innerText = "Showcase your guitars"
      Guitar.getGuitars()
      User.getUsers()
      document.getElementById("account-button").addEventListener("click", showUser)
    })
  } else {
    alert("Please enter a username")
    e.target.reset()
    return(createUsernameForm)
  }  
}

const showUser = () => {
  api.showUser(user).then(User.showUser(user))
}