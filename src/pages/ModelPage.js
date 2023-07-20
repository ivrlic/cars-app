import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { httpClient } from "../store"
import { observer } from "mobx-react-lite"
import { context } from "../context"

const ModelPage = observer (() => {
    
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`/cars-app/brand/${httpClient.currentBrandName}`);
   
  return (
    <div 
    // className="model-cont"
    >
      <div className="model-title-cont">
        <h3 className="model-title">MODEL {httpClient.modelObject?.abrv}
        </h3>
        <div className="model-del-edit-cont">
            <Link to={`/cars-app/brand/${httpClient.currentBrandName}/new`}>
              <i onClick={()=>{
                  if(!context.isEditOn){
                    context.changeEditOn()}
                }}
                className="ri-edit-box-line"
              >
              </i>      
            </Link>
            <i 
                onClick={() => {
                  httpClient.deleteEl("VehicleModel", httpClient.modelObject.id)
                    handleNavigate()
                }} 
                className="ri-delete-bin-6-line">
            </i>
        </div>
      </div>

      <p className="model-description">Brand Name:</p>
      <p className="model-specs">{httpClient.currentBrandName}</p>
      <p className="model-description">Model Name:</p>
      <p className="model-specs">{httpClient.modelObject?.name}</p>
      <p className="model-description">Engine Type:</p>
      <p className="model-specs">{httpClient.modelObject?.engineType}</p>
      <p className="model-description">Transmission Type:</p>
      <p className="model-specs">{httpClient.modelObject?.transmissionType}</p>
      
      <div className="flex-bottom-page">
        <Link to={`/cars-app/brand/${httpClient.currentBrandName}`}><button className="link-btn" >Back</button></Link>
      </div>


    </div>
  )
})

export default ModelPage