import React from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { context } from "../context";

const Form = observer (({ form }) => {

    const navigate = useNavigate();
    const handleNavigate = () => navigate(`/cars-app/brand/`);

    return(
        <form onSubmit={form.onSubmit}>
            <div className="input-cont">
                <label htmlFor={form.$("brandName").id} >
                    {form.$("brandName").label}
                </label>
                <input {...form.$("brandName").bind()} />
                <p className="error-message">{form.$("brandName").error}</p>
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
