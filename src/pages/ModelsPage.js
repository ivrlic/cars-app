import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { httpClient } from "../store"
import { observer } from "mobx-react"
import { context } from "../context"

const ModelsPage = observer (() => {

    useEffect(()=>{
      httpClient.getModelArrayBySearch(httpClient.currentBrandId)
    }, [httpClient.modelArray.length])

    // getting model element in boxes
    // getting models names and making JSX
    const modelElement = httpClient.modelArray.map(model => {
    return (
      <div key={model.id} className="model-frame" >

        <Link to={`/cars-app/brand/${httpClient.currentBrandName}/${model.abrv}`}>
        <p onClick={()=>{
            httpClient.getCurrentModel(model.abrv)
            httpClient.getModelObjectFromArray(model.id)                  
          }}
        >
          {model.abrv}
        </p>
        </Link>

        <div>
          <Link to={`/cars-app/brand/${httpClient.currentBrandName}/new`}>
            <i onClick={()=>{
                  if(!context.isEditOn){
                    context.changeEditOn()}
                  httpClient.getCurrentModel(model.abrv)
                  httpClient.getModelObjectFromArray(model.id)                 }}
              className="ri-edit-box-line"
            >
            </i>      
          </Link>

          <i onClick={() => {
                httpClient.deleteEl("VehicleModel", model.id)
                httpClient.deleteModelFromArray(model.id)
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

        <div className="models-cont cars-grid">
          {modelElement}
        </div>

        <div className="flex-bottom-page">
          <Link to="/cars-app/brand"><button className="link-btn" >Back</button></Link>
          <Link to={`/cars-app/brand/${httpClient.currentBrandName}/new`}><button className="link-btn create-new-link">+</button></Link>
        </div>

    </div>
  )
})


export default ModelsPage