//! ALL VARIABLES
let loginForm = document.getElementById("loginForm");
let loginEmailInput = document.getElementById("loginEmailInput");
let loginPasswordInput = document.getElementById("loginPasswordInput");
let loginAlert = document.getElementById("loginAlert");
let loginSuccessAlert = document.getElementById("loginSuccessAlert");
//! ALL VARIABLES

let allUsers = [];

if (localStorage.getItem("users") != null) {
  allUsers = JSON.parse(localStorage.getItem("users"));
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  userLogin();
});

function userLogin() {
  let user = {
    email: loginEmailInput.value,
    password: loginPasswordInput.value,
  };

  if (isUserFound(user) == true) {
    console.log("okkkkkk");
    loginAlert.classList.add("d-none");
    loginSuccessAlert.classList.remove("d-none");

    setTimeout(function () {
        window.location.href = './welcome.html'
    } , 500)

  } else {
    console.log("try again");
    loginSuccessAlert.classList.add("d-none");
    loginAlert.classList.remove("d-none");
  }
}

function isUserFound(user) {
  for (let i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].email.toLowerCase() == user.email.toLowerCase() &&
      allUsers[i].password.toLowerCase() == user.password.toLowerCase()
    ) {
      console.log("User Found");
      localStorage.setItem("userName", allUsers[i].name);
      return true;
    }
  }
}
