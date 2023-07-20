import React from "react";
import Form from "../components/FormModel";
import form from "../formModel.js";
import { observer } from "mobx-react-lite";
import { httpClient } from "../store.js";
import { context } from "../context.js";


const CreateEditModelPage = observer (() => {
    
    const title = context.isEditOn ?
            `EDITING ${httpClient.currentBrandName} MODEL` :
            `CREATING NEW ${httpClient.currentBrandName} MODEL`
                
    const instructions = context.isEditOn ?
                "Change the data in order to edit the model." :
                "Enter the data in order to create a new model."
                 

    return (
        <div className="new-edit-cont">
            <h3 className="new-edit-title">{title}</h3>
            <p className="new-edit-instructions">{instructions}</p>
            <Form form={form} />
         </div>
   )
})

export default CreateEditModelPage

