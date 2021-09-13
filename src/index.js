const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user
const main = document.getElementById("main")

createUsernameForm()


document.querySelector("form").addEventListener("submit", handleUsernameSubmit)

function createUsernameForm() {
  // main.innerHTML = ""
  main.innerHTML =`
    <form>
      <label for="username">Username</label>
      <input type="text" id="username" name="username"><br>
      <input type="submit" value="Submit">
    </form>
    `
}




function handleUsernameSubmit(e) {
  e.preventDefault() 
  const regex = /^[A-Za-z]+$/;
  if (e.target.username.value.match(regex)) {
    api.findOrCreateUser(e.target.username.value).then(userData => {
      user = userData
      Guitar.getGuitars()
    })
  } else {
      alert("Please enter a username")
      e.target.reset()
      return(createUsernameForm)
  } 
}