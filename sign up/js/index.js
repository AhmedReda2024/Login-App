//! ALL VARIABLES
let registerForm = document.getElementById("registerForm");
let signNameInput = document.getElementById("signNameInput");
let signEmailInput = document.getElementById("signEmailInput");
let signPasswordInput = document.getElementById("signPasswordInput");
let existAlert = document.getElementById("existAlert");
let successAlert = document.getElementById("successAlert");

let allUsers = [];

//! ALL VARIABLES

if (localStorage.getItem("users") != null) {
  allUsers = JSON.parse(localStorage.getItem("users"));
}

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkAllValidationInputs() == true) {
    console.log("user added");
    addUser();
  } else {
    console.log("user not added");
  }
});

function addUser() {
  let newUser = {
    name: signNameInput.value,
    email: signEmailInput.value,
    password: signPasswordInput.value,
  };
  if (isExist(newUser) == true) {
    console.log("Email is already exist");
    successAlert.classList.add("d-none");
    existAlert.classList.remove("d-none");
  } else {
    allUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allUsers));
    existAlert.classList.add("d-none");
    successAlert.classList.remove("d-none");

    setTimeout(function () {
      window.location.href = "./login.html";
    }, 300);
  }
}

function isExist(newUser) {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email.toLowerCase() == newUser.email.toLowerCase()) {
      console.log("email is already exist try again");
      return true;
    }
  }
}

function validateAllInputs(element, msgId) {
  let term = element.value;
  let regex = {
    signNameInput: /^[A-Z][a-z]{3,20}$/,
    signEmailInput: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
    signPasswordInput:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,}).*$/,
  };
  let message = document.getElementById(msgId);

  if (regex[element.id].test(term) == true) {
    // console.log("Valid");
    message.classList.add("d-none");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    return true;
  } else {
    // console.log("Not Valid");
    message.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");

    return false;
  }
}

function checkAllValidationInputs() {
  if (
    validateAllInputs(signNameInput, "nameAlert") &&
    validateAllInputs(signEmailInput, "emailAlert") &&
    validateAllInputs(signPasswordInput, "passwordAlert")
  ) {
    console.log("ok all valid");
    return true;
  } else {
    console.log("not okk all not valid");
    return false;
  }
}
