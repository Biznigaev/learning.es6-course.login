const UI = {
  formLogin: document.forms["loginForm"],
  formRegister: document.forms["registerForm"],
  loginFields: {
    inputEmail: document.getElementById("login-email"),
    inputPassword: document.getElementById("login-password")
  },
  signinFields: {
    inputEmail: document.getElementById("signin-email"),
    inputNickname: document.getElementById("signin-nickname"),
    inputPassword: document.getElementById("signin-password"),
    inputFirstname: document.getElementById("signin-firstname"),
    inputLastname: document.getElementById("signin-lastname"),
    inputBirthdate: document.getElementById("signin-birth"),
    inputPhone: document.getElementById("signin-phone"),
    inputSex: document.querySelector("input:checked[name=gender_orientation]"),
    inputCountry: document.getElementById("signin-country"),
    inputCity: document.getElementById("signin-city"),
    inputAcceptPolicy: document.getElementById("signin-acceptPolicy")
  }
};

export default UI;
