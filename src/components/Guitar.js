class Guitar {

  static all = []

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }

  // Render all guitars
  renderCard = () => {
    const {brand, model, imageUrl, id} = this.data
    document.getElementById("guitar-container").innerHTML += `
    <div class="guitar-card" data-id=${id}>
      <img src=${imageUrl} alt=${brand} ${model}/>
      <p class='guitar-name'>${brand} </p>
      <p>${model}</p>
      <button>View</button>
    </div>
  `
  }

  // Render a single guitar
  showGuitar = () => {
    const {style, brand, model, imageUrl, id, username, createdAt} = this.data
    const header2 = document.getElementById("header-2")
    header2.innerHTML = `${brand} ${model} <br>
    <button id="back-button">Go Back</button>`
    document.getElementById("back-button").addEventListener("click", Guitar.getGuitars)
    document.querySelector("button.add-guitar").style.display = "none"


    document.getElementById("guitar-container").innerHTML = `
    <div class="guitar-card" data-id=${id}>
      <img src=${imageUrl} alt=${brand} ${model}/>
      <p>Type: ${style}</p>
      <p>Posted: ${createdAt}</p>
      <p>Posted by: ${username}</p>
    </div>
  `
  }

  // Find method
  static find = (id) => this.all.find(guitar => guitar.data.id === id)

  // Fetch guitars from database
  static getGuitars = () => {
    api.getGuitars().then(guitars => {
      if (guitars.length !== undefined) {
        Guitar.all = []
        guitars.forEach(guitar => new Guitar(guitar))
      } else {
        Guitar.all = []
      }
      this.renderGuitars()
    })
  }

  // Click event to submit new guitar form
  static handlePost = (e) => {
    e.preventDefault()
    const createGuitar = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      style: e.target.style.value,
      image_url: e.target.imageUrl.value
    }
    api.createGuitar(createGuitar).then(post => new Guitar(post).renderCard())
    modal.close()
    e.target.reset()
  }
  
  // Add guitar form
  static openNewProductForm = () => {

    modal.main.innerHTML = `
    <h2>Post your product</h2>
    <form>
    <label for="brand">Brand:</label><br>
    <input type="text" name="brand" required><br>
    <label for="model">Model:</label><br>
    <input type="text" name="model" required><br>
    <label for="imageUrl">Image URL:</label><br>
    <input type="text" name="imageUrl" required></br>
    
    <label for="style">Style:</label><br>
    <input type="radio" name="style" value="Electric" required>
    <label for="Electric">Electric</label>
    <input type="radio" name="style" value="Acoustic" required>
    <label for="Acoustic">Acoustic</label>
    <input type="radio" name="style" value="Acoustic-electric" required>
    <label for="Acoustic-electric">Acoustic-electric</label><br>

    
    <input type="submit" value="Post"><br>
    </form>
    `
    
    modal.main.querySelector("form").addEventListener("submit", this.handlePost)
    modal.open()
  }

  // Render all guitar cards to page
  static renderGuitars = () => {
    document.getElementById("header-2").innerHTML = "Showcase your guitars"
    const main = document.getElementById('main')
    main.innerHTML = ""

    const guitarContainer = document.createElement('div')
    guitarContainer.id = "guitar-container"

    const addPost = document.createElement('button')
    addPost.innerText = "Add a guitar"
    addPost.classList.add("add-guitar")
    addPost.addEventListener("click", this.openNewProductForm)

    main.append(addPost, guitarContainer)
    this.all.forEach(guitar => guitar.renderCard())
    guitarContainer.addEventListener("click", this.handleShowGuitar)
  }

  // Click event listener on index of all guitars to show page
  static handleShowGuitar = (e) => {
    if (e.target.tagName == "IMG" || e.target.innerText == "View") {
      let id = e.target.closest(".guitar-card").dataset.id
      id = parseInt(id)
      console.log(`The ID is currently set to ${id}`)
      Guitar.find(id).showGuitar()
    }
  }
  
}
