import {
  action,
  makeObservable,
  observable,
  } from "mobx";


class HttpClient {

  token = ""
  brandArray = []
  modelArray = []
  modelObject = {}
  currentBrandName = " "
  currentBrandId = " "
  currentModel = " "
  maxOrdinalNum = 102

  constructor(){
    makeObservable(this, {
      token: observable,
      brandArray: observable,
      modelArray: observable,
      modelObject: observable,
      currentBrandName: observable,
      currentBrandId: observable,
      currentModel: observable,
      maxOrdinalNum: observable,
      getToken: action,
      getBrandArray: action,
      getModelArray: action,
      getModelArrayBySearch: action,
      getModelObjectBySearch: action,
      getModelObjectFromArray: action,
      getCurrentBrandName: action,
      getCurrentBrandId: action,
      getCurrentModel: action,
      deleteEl: action,
      deleteModelFromArray: action,
      changeModelObjectFromArray: action,
      createModel: action,
      createBrand: action,
      getMaxOrdinal: action,
      updateEl: action,
      updateBrand: action,
    })
  }

  // getting token needed for POST, PUT AND DELETE
  getToken(){
  const url = "https://api.baasic.com/v1/vehicle-car-app/login"
  const data = new URLSearchParams()
  data.append("username", "ivrlic")
  data.append("password", "vehicle-car-app")
  data.append("grant_type", "password")

  fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: data,
      })
      .then(response => response.json())
      .then(data => {
          this.token = data.access_token
      })
      .catch(error => {
          console.error("While getting the token the error occured: " + error)
      })
  }


  // getting brands array
  getBrandArray () {
    fetch(`https://api.baasic.com/v1/vehicle-car-app/resources/VehicleMake`)
    .then(
        action("fetchResponseSuccess", res => res.json()))
    .then(
        action("fetchGetBrandArraySuccess", data => {
          this.brandArray = data.item
        }),
        action("fetchError", error => {
          console.error(`cancel getting data... error: ${error}`)
        })
    )
  }


  // getting model array
  getModelArray() {
    fetch(`https://api.baasic.com/v1/vehicle-car-app/resources/VehicleModel`)
    .then(
        action("fetchResponseSuccess", res => res.json()))
    .then(
        action("fetchGetModelArraySuccess", data => {
          this.modelArray = data.item
        }),
        action("fetchError", error => {
          console.error(`cancel getting data... error: ${error}`)
        })
    )
  }


  // getting model array by search criteria
  getModelArrayBySearch(makeId) {
      const schemaName = "VehicleModel"
      const searchProperty = "makeId"
      const searchValue = makeId
      const searchPhrase = `WHERE ${searchProperty}='${searchValue}'`
      const page = 1
      const rpp = 9
      const sortCondition = "Id|asc"
      const url = `https://api.baasic.com/v1/vehicle-car-app/resources/${schemaName}/?searchQuery=${searchPhrase}&page=${page}&rpp=${rpp}&sort=${sortCondition}&embed=owner/`

      fetch(url)
      .then(
          action ("fetchResponseSuccess", res => res.json()))
      .then(
          action("fetchGetSearchSuccess", data => {
            this.modelArray = data.item
          }),
          action("fetchError", error => {
            console.error(`cancel getting data... error: ${error}`)
          })
      )
    }

    
  // getting current model object by search criteria
  getModelObjectBySearch(id) {
    const schemaName = "VehicleModel"
    const searchProperty = "id"
    const searchValue = id
    const searchPhrase = `WHERE ${searchProperty}='${searchValue}'`
    const page = 1
    const rpp = 9
    const sortCondition = "id|asc"
    const url = `https://api.baasic.com/v1/vehicle-car-app/resources/${schemaName}/?searchQuery=${searchPhrase}&page=${page}&rpp=${rpp}&sort=${sortCondition}&embed=owner/`

    fetch(url)
    .then(
      action ("fetchResponseSuccess", res => res.json()))
    .then(
        action("fetchGetSearchSuccess", data => {
          this.modelObject = data.item[0]
        }),
        action("fetchError", error => {
          console.error(`cancel getting data... error: ${error}`)
        })
    )
  }

  // searching for a current model object in modelArray
  getModelObjectFromArray(id){
    const modelObject = this.modelArray.filter(object => {
      return object.id === id
    })
    this.modelObject = modelObject[0]
  }

  // edit model from array
  changeModelObjectFromArray(id, abrv, makeId, engineType, transmissionType, ordinal){
    this.modelObject.id = id
    this.modelObject.abrv = abrv.toUpperCase()
    this.modelObject.name = this.currentBrandName + " " + abrv.toUpperCase()
    this.modelObject.makeId = makeId
    this.modelObject.engineType = engineType
    this.modelObject.transmissionType = transmissionType
    this.modelObject.ordinal = ordinal
    this.updateEl("VehicleModel", 
                  id, 
                  abrv,
                  makeId, 
                  engineType,
                  transmissionType,
                  ordinal)
  }

  // delete model from array
  deleteModelFromArray(id){
    const newArray = this.modelArray.filter(object => {
      return object.id !== id
    })
    this.modelArray = newArray
  }


  // getting current brand abbreviation name in order to control url
  getCurrentBrandName(brandName) {
    this.currentBrandName = brandName
  }

  // getting current brand abbreviation name in order to control url
  getCurrentBrandId(brandId) {
    this.currentBrandId = brandId
  }

  // getting current model abbreviation name in order to control url
  getCurrentModel(currentModel) {
    this.currentModel = currentModel
  }


  // deleting elements
  deleteEl(schemaName, objectId) {
    const url = `https://api.baasic.com/V1/vehicle-car-app/resources/${schemaName}/${objectId}/`
    fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `bearer ${this.token}`,
        }
    })
    .then(response => console.log(response))
    .catch(error => console.error(error))
  }


// getting new biggest ordinal number in order to put it in a new model (when creating new model)
// there has to be an ordinal number in a object properties, when it is missing, an error occurs for a reason to work
// first need to get all the models,
// than sort the array by ordinal num in order to find the biggest one,
// and then the biggist one + 1 
getMaxOrdinal() {
  fetch(`https://api.baasic.com/v1/vehicle-car-app/resources/VehicleModel`)
  .then(
      action("fetchResponseSuccess", res => res.json()))
  .then(
      action("fetchGetModelArraySuccess", data => {
        if(data.item){
          const sortedArray = data.item.sort((a, b) => {
            return a.ordinal > b.ordinal ? -1 : 1
          });
          this.maxOrdinalNum = Number(sortedArray[0].ordinal) + 1 
        } else {this.maxOrdinalNum = 1}
      }),
      action("fetchError", error => {
        console.error(`cancel getting data... error: ${error}`)
      })
  )
}


  // posting element - creating a new model
  createModel(abrv, engType, trasmType) {
    this.getMaxOrdinal()
    const url = `https://api.baasic.com/v1/vehicle-car-app/resources/VehicleModel/`
    const description = `{
        "id": "",
        "abrv": "${abrv.toUpperCase()}",
        "name": "${this.currentBrandName + " " + abrv.toUpperCase()}",
        "makeId": "${this.currentBrandId}",
        "engineType": "${engType}",
        "transmissionType": "${trasmType}",
        "ordinal": "${this.maxOrdinalNum}",
      }`

    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `bearer ${this.token}`,
            "Content-Type": "application/json",
        },
        body: description,
    })
    .then(response => console.log(response))
    .catch(error => console.error(error))
  }


    // posting element - creating a new brand
    createBrand(abrv) {
      const url = `https://api.baasic.com/v1/vehicle-car-app/resources/VehicleMake/`
      const description = `{
          "id": "",
          "abrv": "${abrv.toUpperCase()}",
          "name": "${abrv}",
        }`
       fetch(url, {
          method: "POST",
          headers: {
              "Authorization": `bearer ${this.token}`,
              "Content-Type": "application/json",
          },
          body: description,
      })
      .then(response => console.log(response))
      .catch(error => console.error(error))
    }


  // updating elements
  updateEl(schemaName, objectId, abrv, makeId, engType, trasmType, ordinal) {
    const url = `https://api.baasic.com/v1/vehicle-car-app/resources/${schemaName}/${objectId}/`

    const description = `{
      "abrv": "${abrv.toUpperCase()}",
      "name": "${this.currentBrandName + " " + abrv.toUpperCase()}",
      "makeId": "${makeId}",
      "engineType": "${engType}",
      "transmissionType": "${trasmType}",
      "ordinal": "${ordinal}",
    }`

    fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `bearer ${this.token}`,
            "Content-Type": "application/json"
        },
        body: description
    })
    .then(response => {console.log(response)})
    .catch(error => {console.error(error)})
  }


  // updating elements
  updateBrand(schemaName, objectId, abrv) {
    const url = `https://api.baasic.com/v1/vehicle-car-app/resources/${schemaName}/${objectId}/`

    const description = `{
      "abrv": "${abrv.toUpperCase()}",
      "name": "${abrv}",
    }`

    fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `bearer ${this.token}`,
            "Content-Type": "application/json"
        },
        body: description
    })
    .then(response => {console.log(response)})
    .catch(error => {console.error(error)})
  }

}


export const httpClient = new HttpClient()

