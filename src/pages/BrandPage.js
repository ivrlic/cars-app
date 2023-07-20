import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { httpClient} from "../store"
import { observer } from "mobx-react"
import { context } from "../context"

const BrandPage = observer (() => {
  
    // getting brand cars from rest api
    useEffect(()=>{
      httpClient.getBrandArray()
    }, [httpClient.brandArray])

function hadleDelete(makeId) {
  // first checking if there are any models inside that brand
  httpClient.getModelArrayBySearch(makeId)
  console.log(httpClient.modelArray.length)
  console.log(httpClient.modelArray===true)
  setTimeout(() => {
    if(!httpClient.modelArray || httpClient.modelArray.length===0){
      httpClient.deleteEl("VehicleMake", makeId)
    } else {
      console.log("Can't delete. There are still some models connected to the brand.")
    }
    
  }, 250);

}

    // getting brands' names and making JSX
    const brandElement = httpClient.brandArray.map(brand => {
        return (
          <div key={brand.id} className="model-frame" >

            <Link to={`/cars-app/brand/${brand.abrv}`}>
            <p onClick={()=>{
                httpClient.getCurrentBrandName(brand.abrv)
                httpClient.getCurrentBrandId(brand.id)
                httpClient.getModelArrayBySearch(brand.id)                 
              }}
            >
              {brand.abrv}
            </p>
            </Link>
  
            <div>
              <Link to={`/cars-app/brand/new`}>
                <i onClick={()=>{
                  console.log("click!!")
                      if(!context.isEditOn){
                        context.changeEditOn()}
                        httpClient.getCurrentBrandName(brand.abrv)
                        httpClient.getCurrentBrandId(brand.id)
                   }}
                  className="ri-edit-box-line"
                >
                </i>      
              </Link>
    
              <i onClick={() => {
                    hadleDelete(brand.id)
                  }}
                    className="ri-delete-bin-6-line"
              >
              </i>
            </div>
        </div>

        )
    })
  

    return (
      <div>
          <div className="brands-cont cars-grid">
              {brandElement}
          </div>
          <div className="flex-bottom-page">
            <Link to="/cars-app/"><button className="link-btn">Back</button></Link>
            <Link to={`/cars-app/brand/new`}><button className="link-btn create-new-link">+</button></Link>
          </div>     
      </div>
  )
})

export default BrandPage
