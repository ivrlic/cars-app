import {
    action,
    makeObservable,
    observable,
    } from "mobx";
  
  
  class Context {
  
    isAlertOn = false
    isEditOn = false
    isBrandOn = false
  
    constructor(){
      makeObservable(this, {
        isAlertOn: observable,
        isEditOn: observable,
        isBrandOn: observable,
        changeAlertOn: action,
        changeEditOn: action,
        changeBrandOn: action,
      })
    }
   
    changeAlertOn(){
      this.isAlertOn = !this.isAlertOn
    }

    changeEditOn(){ 
      this.isEditOn = !this.isEditOn
    }

    changeBrandOn(){
      this.isBrandOn = !this.isBrandOn
    }
  
  }
  
  
export const context = new Context()
  
  