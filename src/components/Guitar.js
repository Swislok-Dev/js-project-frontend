class Guitar {

  static all = []

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }


  renderCard = () => {
    const {brand, model, imageUrl, id} = this.data
    document.getElementById("guitar-container").innerHTML += `
    <div class="guitar-card" data-id=${id}>
      <img src=${imageUrl} alt=${brand} ${model}/>
      <p class='guitar-name'>${brand} </p>
      <p>${model}</p>
      <button>Purchase</button>
    </div>
  `
  }

  static find = (id) => this.all.find(guitar => guitar.data.id === id)

  static getGuitars = () => {
    api.getGuitars().then(guitars => {
      guitars.forEach(guitar => new Guitar(guitar))
      this.renderGuitars()
    })
  }

  static renderGuitars = () => {
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
  }

  static handlePost = (e) => {
    e.preventDefault()
    debugger
    const newPost = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      style: e.target.style.value,
      image_url: e.target.imageUrl.value
    }
    api.newPost(newPost).then(post => new Guitar(post).renderCard())
    modal.close()
  }

  static openNewProductForm = () => {
    modal.main.innerHTML = `
    <h2>Post your product</h2>
    <form>
      <label for="brand">Brand:</label><br>
      <input type="text" name="brand"><br>
      <label for="model">Model:</label><br>
      <input type="text" name="model"><br>
      <label for="style">Style:</label><br>
      <input type="text" name="style"><br>
      <label for="imageUrl">Image URL:</label><br>
      <input type="text" name="imageUrl"></br>
      <input type="submit" value="Post"><br>
    </form>
    `

    modal.main.querySelector("form").addEventListener("submit", this.handlePost)
    modal.open()
  }







}
