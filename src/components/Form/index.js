//import packages from node modules
import React, {useState, useRef, useEffect, useCallback} from "react";
import axios from "axios";

export default function Form() {
  //define local variables

  //arrays ids to generate checkboxes
  const checkboxID = [1, 2, 3, 4, 5, 6, 7, 8];

  //generate checkbox details
  const checkboxesName = checkboxID.map((id) => ({
    name: `value${id}`,
    label: `Value ${id}`
  }));

  //define variables from hook
  const formInitialValue = {
    checkbox: {},
    changed: false
  };
  const [formValue, setFormValue] = useState(formInitialValue);
  const [formRequest, setFormRequest] = useState({});
  const formRef = useRef(null);

  //input validation
  const checkRequired = () => {
    let valid = true;
    const required = ["firstName", "email", "phone", "time"];
    required.forEach(name => {
      if (!formValue[name]) {
        valid = false
      }
    });
    return valid
  };
  const checkCheckboxFields = () => {
    let checked = [];
    checkboxID.forEach(id => {
      if (formValue["checkbox"][`value${id}`]) {
        checked.push(id);
      }
    });
    return (checked.length > 1 && checked.length < 6)
  };

  const checkEmailFields = value =>
      value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
          ? 'Invalid email address'
          : undefined;


  //check if form is valid
  const isFormInvalid = () => {
    if (!checkRequired()) {
      return "Please make sure you fill all the required fields";
    }
    if (!checkCheckboxFields()) {
      return "Please make sure you select minimum 2 and maximum 5 for the check boxes";
    }
    if (checkEmailFields(formValue.email)) {
      return checkEmailFields(formValue.email)
    }
    return false;
  };

  //on form submit callback
  const onFormSubmit = e => {
    e.preventDefault();
    if (!isFormInvalid()) {
      setFormRequest({
        ...formRequest,
        status: "loading"
      });
      axios.post("https://formspree.io/f/mleokrqb", formValue).then(response => {
        setFormValue({});
        localStorage.removeItem("formValue");
        setFormRequest({
          ...formRequest,
          status: "success",
          data: response,
          error: null
        });
      }, error => {
        setFormRequest({
          ...formRequest,
          status: "error",
          data: null,
          error
        });
      })
    }
  };

  //on form reset callback

  const onFormResetCallback = () => {
    setFormRequest({
      ...formRequest,
      status: 'loading'
    });
    setTimeout(() => {
      setFormRequest({});
      localStorage.removeItem("formValue");
      setFormValue(formInitialValue);
    }, 300);
  };

  //on checkbox change callback
  const onCheckboxInputChange = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    const newValue = formValue;
    newValue.checkbox[name] = checked;
    if (!newValue.changed) {
      newValue.changed = true;
    }
    setFormValue(newValue);
    localStorage.setItem("formValue", JSON.stringify(newValue));
  };

  //on other fields change callback
  const onGeneralFieldChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const newValue = formValue;
    newValue[name] = value;
    if (!newValue.changed) {
      newValue.changed = true;
    }
    setFormValue(newValue);
    localStorage.setItem("formValue", JSON.stringify(newValue));
  };

  const onInitValuesFromLocalStorage = useCallback(() => {
    const formValueString = localStorage.getItem("formValue");
    if (formValueString && JSON.parse(formValueString)) {
      const storedFormValue = JSON.parse(formValueString);
      setFormValue(storedFormValue);
      if (Object.keys(storedFormValue) && Object.keys(storedFormValue).length) {

        Object.keys(storedFormValue).forEach(name => {
          const field = formRef.current.querySelector(`input[name='${name}']`);
          if (field) {
            field.value = storedFormValue[name];
          }
        });

        const time = formRef.current.querySelector(`select[name='time']`);
        if (time) {
          time.value = storedFormValue["time"]
        }

        if (storedFormValue.checkbox && Object.keys(storedFormValue.checkbox)
            && Object.keys(storedFormValue.checkbox).length) {
          Object.keys(storedFormValue.checkbox).forEach((name) => {
            const field = formRef.current.querySelector(`input[name='${name}']`);
            if (field && storedFormValue.checkbox[name]) {
              field.checked = true
            }
          })
        }
      }
    }
  }, []);

  useEffect(() => {
    onInitValuesFromLocalStorage()
  }, [onInitValuesFromLocalStorage]);

  //render

  const renderCheckbox = () => {
    return checkboxesName.map((item, index) => {
      return (
          <div className={"checkbox-list__item"} key={index}>
            <input onChange={onCheckboxInputChange} name={item.name} type={"checkbox"}/><label>{item.label}</label>
          </div>
      )
    });
  };

  //render error message underneath the field instantly
  const renderErrorGeneralField = fieldName => {
    if (!formValue[fieldName] && formValue.changed) {
      return (<span className={"form__error"}>Required</span>)
    }
  };

  //render error beneath the submit button
  const renderErrorSummary = () => {
    return isFormInvalid() && formValue.changed ? <span className={"form__error"}>{isFormInvalid()}</span> : <></>
  };

  const renderHeading = () => {
    switch (formRequest.status) {
      case 'success':
        return (<h5 className={"form__heading"}>Success</h5>);
      case 'error':
        return (<h5 className={"form__heading"}>Contact Our Support Team</h5>);
      default:
        return (
            <h5 className={"form__heading"}>Be the first to register for new townhome releases for first option</h5>)
    }
  };

  const renderFields = () => {
    if (!formRequest.status) {
      return (<>
        <div className={"form__item"}>
          <input onChange={onGeneralFieldChange} name={"firstName"} type={"text"} placeholder={"First Name"}/>
          {renderErrorGeneralField("firstName")}
        </div>
        <div className={"form__item"}>
          <input onChange={onGeneralFieldChange} name={"email"} type={"email"} placeholder={"Email"}/>
          {renderErrorGeneralField("email")}
        </div>
        <div className={"form__item"}>
          <input onChange={onGeneralFieldChange} name={"phone"} type={"phone"} placeholder={"Phone"}/>
          {renderErrorGeneralField("phone")}
        </div>
        <div className={"form__item form__item-dropdown"}>
          <select onChange={onGeneralFieldChange} name={"time"}>
            <option value={""}>When are you looking to buy?</option>
            <option value={"Morning"}>Morning</option>
            <option value={"Afternoon"}>Afternoon</option>
            <option value={"Evening"}>Evening</option>
          </select>
          {renderErrorGeneralField("time")}
        </div>
        <div className={"form__item checkbox-list"}>
          {renderCheckbox()}
        </div>
      </>)
    }
    return (<></>)
  };

  const renderButtons = () => {
    if (formRequest.status === "success" || formRequest.status === "error") {
      return (
          <div className={"form__item form__item--button"}>
            <button onClick={e => {
              e.preventDefault();
              onFormResetCallback();
            }} className={"form__button form__button--secondary"}>Reset
            </button>
          </div>
      )
    }
    return (
        <div className={"form__item form__item--button"}>
          <button disabled={isFormInvalid()}
                  className={`form__button${isFormInvalid() ? ' form__button--disabled' : ''}`} type={"submit"}>Submit
          </button>
          <button onClick={e => {
            e.preventDefault();
            onFormResetCallback();
          }} className={"form__button form__button--secondary"}>Reset
          </button>
        </div>
    )
  };

  const renderFormClassName = () => {
    switch (formRequest.status) {
      case "loading":
      case "success":
        return (`form form--${formRequest.status}`);
      default:
        return (`form`)
    }
  };

  if (formRequest.status === "loading") {
    return (
        <div className={"form form--loading"}>
          <h5 className={"form__heading"}>Loading...</h5>
        </div>
    )
  }
  return (
      <form id={"form"} className={renderFormClassName()} ref={formRef} onSubmit={onFormSubmit}>
        <div className={"form__wrapper"}>
          {renderHeading()}
          {renderFields()}
          {renderButtons()}
          {renderErrorSummary()}
        </div>
      </form>
  )
}

