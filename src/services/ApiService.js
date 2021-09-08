class ApiService {
  constructor(api) {
    this.api = api
  }

  getGuitars = () => {
    return fetch(this.api + "/guitars")
    .then(response => response.json())
  }
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