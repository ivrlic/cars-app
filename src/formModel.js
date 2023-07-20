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
    name: "modelName",
    label: "Model Name",
    placeholder: "Insert Model Name",
    rules: "required|string",
    value: context.isEditOn ? httpClient.modelObject.abrv : "",
    options: {
      autoTrimValue: true
    }
  },
  {
    name: "engineType",
    label: "Engine Type",
    placeholder: context.isEditOn ? httpClient.modelObject.engineType : "Choose",
    value: context.isEditOn ? httpClient.modelObject.engineType : "",
    rules: "required",
    type: "select",
    options: [
      {value: "diesel", label: "diesel"},
      {value: "gas", label: "gas"}
    ],
  },
  {
    name: "transmissionType",
    label: "Transmission Type",
    placeholder: context.isEditOn ? httpClient.modelObject.transmissionType : "Choose",
    value: context.isEditOn ? httpClient.modelObject.transmissionType : "",
    rules: "required",
    type: "select",
    options: [
      {value: "auto", label: "auto"},
      {value: "manual", label: "manual"}
    ]
  }
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
    context.isEditOn 
    ?
    httpClient.changeModelObjectFromArray(
        httpClient.modelObject.id, 
        formValues.modelName,
        httpClient.modelObject.makeId, 
        formValues.engineType.value, 
        formValues.transmissionType.value,
        httpClient.modelObject.ordinal) 
        :
     httpClient.createModel(
        formValues.modelName, 
        formValues.engineType.value, 
        formValues.transmissionType.value)
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
