import React from "react";
import { observer } from "mobx-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../store";
import { context } from "../context";

const Form = observer (({ form }) => {

    const navigate = useNavigate();
    const handleNavigate = () => navigate(`/cars-app/brand/${httpClient.currentBrandName}`);

    return(
        <form onSubmit={form.onSubmit}>
            <div className="input-cont">
                <label htmlFor={form.$("modelName").id} >
                    {form.$("modelName").label}
                </label>
                <input {...form.$("modelName").bind()} />
                <p className="error-message">{form.$("modelName").error}</p>
            </div>

            <div className="select-cont">
                <label>{form.$("engineType").label}</label>
                <Select 
                    className="select-field"
                    options=
                        {form.$("engineType").options} 
                        {...form.$("engineType").bind()}
                />
                <p className="error-message">{form.$("engineType").error}</p>
            </div>

            <div className="select-cont last-cont">
                <label>{form.$("transmissionType").label}</label>
                <Select 
                    className="select-field" 
                    options=
                        {form.$("transmissionType").options} 
                        {...form.$("transmissionType").bind()} 
                />
                <p className="error-message">{form.$("transmissionType").error}</p>
            </div>
    
            <div className="flex-bottom-page">
                <button className="link-btn" type="button" onClick={(e)=>{
                        handleNavigate()
                        form.onClear(e)
                        if(context.isEditOn){
                            context.changeEditOn()}
                    }}
                >
                    Back
                </button>
                <button className="link-btn" type="submit" 
                    onClick={form.onSubmit}
                >
                    Submit
                </button>
                <p className="error-message">{form.error}</p>
            </div>

        </form>
    )

})

export default Form 
