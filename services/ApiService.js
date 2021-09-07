class ApiService {
  constructor(api) {
    this.api = api
  }

  getGuitars = () => fetch(this.api + "/guitars")
    .then(response => {return response.json()})
    .then(json => console.log(json))
  
  // variableHere = (newVar) => {
  //   return fetch(this.api + "/route", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newVar)
  //   })
  //   .then(response => response.json())
  // }
}