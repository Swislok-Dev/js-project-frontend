class ApiService {
  constructor(api) {
    this.api = api
  }

  variableHere = (newVar) => {
    return fetch(this.api + "/route", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVar)
    })
    .then(response => response.json())
  }
}