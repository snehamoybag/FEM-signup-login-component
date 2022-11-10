"use strict"
// CSS STYLESHEET
import "../scss/style.scss";

// JAVASCRIPT
// Form elements
const signupFormEl = document.querySelector("#signup-form");
const inptFirstNameEl = document.querySelector("#first-name");
const inptLastNameEl = document.querySelector("#last-name");
const inptEmailEl = document.querySelector("#email");
const inptPasswordEl = document.querySelector("#password");
const btnSubmitEl = document.querySelector("#btn-submit");

// Regular Expressions
const regex = {
  name: /^[a-zA-Z]{2,}$/,
  email: /(^\S{1,64})@(\S*[a-zA-Z0-9]{1,255}$)/,
  password: /^\S{8,32}$/,
  whitespace: /\s/g
};

// Blueprint for the input validation
function InputValidator(element, elName, elRegex, minLength, maxLength) {
  return {
    element,
    name,
    elRegex,
    minLength,
    maxLength,
    
    validate() {
      const errMsg = element.nextElementSibling;
      // validation
      if (element.value === "" || element.value === null) {
        errMsg.textContent = `${elName} cannot be empty`;
        element.parentElement.classList.add("input-error");
      }
      else if (regex.whitespace.test(element.value)) {
        errMsg.textContent = `${elName} cannot contain any white space`;
        element.parentElement.classList.add("input-error");
      }
      else if (element.value.length < minLength) {
        errMsg.textContent = `${elName} has to be atleast ${minLength} characters long`;
        element.parentElement.classList.add("input-error");
      }
      else if (element.value.length > maxLength) {
        errMsg.textContent = `${elName} cannot be longer than ${maxLength} characters`
        element.parentElement.classList.add("input-error");
      }
      else if (!elRegex.test(element.value)) {
        errMsg.textContent = `Looks like this is not a valid ${elName}`;
        element.parentElement.classList.add("input-error");
      }
      else {
        errMsg.textContent = "";
        element.parentElement.classList.remove("input-error");
      }
    }
  }
}

// Creating input objects
const firstNameObj = InputValidator(inptFirstNameEl, "First Name", regex.name, 2, 60);
const lastNameObj = InputValidator(inptLastNameEl, "Last Name", regex.name, 2, 60);
const emailObj = InputValidator(inptEmailEl, "Email", regex.email, 3, 320);
const passwordObj = InputValidator(inptPasswordEl, "Password", regex.password, 8, 48);

// Doing live form validation
inptFirstNameEl.addEventListener("input", () => {
  firstNameObj.validate();
});
inptLastNameEl.addEventListener("input", () => {
  lastNameObj.validate();
});
inptEmailEl.addEventListener("input", () => {
  emailObj.validate();
});
inptPasswordEl.addEventListener("input", () => {
  passwordObj.validate();
});

// Doing form validation when user clicks submit
btnSubmitEl.addEventListener("click", () => {
  firstNameObj.validate();
  lastNameObj.validate();
  emailObj.validate();
  passwordObj.validate();
});

// Prevent form submiting when a input is invalid 
signupFormEl.addEventListener("submit", e => {
  if (
    regex.name.test(inptFirstNameEl.value) &&
    regex.name.test(inptLastNameEl.value) &&
    regex.email.test(inptEmailEl.value) &&
    regex.password.test(inptPasswordEl.value)
  ) { alert(`Thankyou for Signing Up ${inptFirstNameEl.value} ${inptLastNameEl.value}!`); }
  else { e.preventDefault(); }
});
