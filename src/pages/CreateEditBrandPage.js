import React from "react";
import Form from "../components/FormBrand";
import form from "../formBrand.js";
import { observer } from "mobx-react-lite";
import { httpClient } from "../store.js";
import { context } from "../context.js";


const CreateEditBrandPage = observer (() => {
    
    const title = context.isEditOn ?
            `EDITING ${httpClient.currentBrandName} BRAND` :
            `CREATING NEW BRAND`
                
    const instructions = context.isEditOn ?
                "Change the data in order to edit the brand." :
                "Enter the data in order to create a new brand."
                 

    return (
        <div className="new-edit-cont">
            <h3 className="new-edit-title">{title}</h3>
            <p className="new-edit-instructions">{instructions}</p>
            <Form form={form} />
         </div>
   )
})

export default CreateEditBrandPage

