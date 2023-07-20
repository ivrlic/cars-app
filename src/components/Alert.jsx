import React from "react"
import { Link } from "react-router-dom"
import form from "../formModel"
import { httpClient } from "../store"
import { context } from "../context"

export default function Alert() {

    const url = context.isBrandOn ? 
    `/cars-app/brand/` :
    `/cars-app/brand/${httpClient.currentBrandName}`

    const phrase = context.isBrandOn ? "brand" : "model"


  return (
    <div className="alert-window">
        <div className="alert-box">
            <p>
                {context.isEditOn ?
                `You have successfully updated the ${phrase}!` :
                `You have successfully created a new ${phrase}!`}
            </p>
            <Link to={url} >
                <button className="link-btn" onClick={(e)=>{
                    context.changeAlertOn()                 
                    setTimeout(() => {
                        form.onClear(e)
                        if(context.isBrandOn){
                            context.changeBrandOn()
                        }
                        if(context.isEditOn){
                            context.changeEditOn()}
                    }, 100); 
                    }}>OK</button>
            </Link>
        </div>
    </div>
  )
}
