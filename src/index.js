const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user
const main = document.getElementById("main")


// Function for creating a user form to login
function createUsernameForm() {
  main.innerText =`
  <form>
  <label for="username">Username</label><br>
  <input type="text" id="username" name="username"><br>
  <input type="submit" value="Submit">
  </form>
  `
}

// Call the function to have the form be present upon loading into the page
createUsernameForm()

// Function definition for handleSubmit on user form
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
    })
  } else {
    alert("Please enter a username")
    e.target.reset()
    return(createUsernameForm)
  }  
}

// Event listener for declaration of the handleSubmit for username submit button
document.querySelector("form").addEventListener("submit", handleUsernameSubmit)

// Function definition for displaying the current logged in user
const showUser = (username) => {
  api.findOrCreateUser(username).then(userData => user = userData)
  api.showUser(user).then(User.showUser(user))
}

// Event listener for declaration of the click on the "Account" button when logged in
document.getElementById("account-button").addEventListener("click", () => {
  showUser(user.username)
})