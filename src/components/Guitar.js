class Guitar {

  static all = []

  constructor(data) {
    this.data = data
    this.constructor.all.push(this)
  }


  renderCard = () => {
    const {style, brand, model, price, imageUrl, id} = this.data
    document.getElementById("guitar-container").innerHTML += `
    <div class="guitar-card" data-id=${id}>
      <img src=${imageUrl} alt=${brand, model}/>
      <p class='guitar-name'>${brand} </p>
      <p>${model}</p>
      <p>Price: $${price}</p>
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
    main.appendChild(guitarContainer)
    this.all.forEach(guitar => guitar.renderCard())
  }







}
