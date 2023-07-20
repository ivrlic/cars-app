import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { httpClient } from "./store";
import { autorun } from "mobx";
import { context } from "./context";


const plugins = {
  dvr: dvr(validatorjs)
};

const fields = [
  {
    name: "brandName",
    label: "Brand Name",
    placeholder: "Insert Brand Name",
    rules: "required|string",
    value: context.isEditOn ? httpClient.currentBrandName: "",
    options: {
      autoTrimValue: true
    }
  },
];


const hooks = {
  onInit(form) {
    autorun(() => form.clearing && console.log("Clearing..."));
    autorun(() => form.validating && console.log("Validating..."));
    autorun(() => form.submitting && console.log("Submitting..."));
  },
  onSuccess(form) {
    context.changeAlertOn()
    // get field values
    const formValues = form.values();
    context.changeBrandOn()
    context.isEditOn 
    ?
    httpClient.updateBrand("VehicleMake", httpClient.currentBrandId, formValues.brandName)
    :
    httpClient.createBrand(formValues.brandName)
   },
  onError(form) {
    // get all form errors
    console.log("All form errors", form.errors());
  }
};

export default new MobxReactForm(
  { fields},
  { plugins, hooks }
);
