"use strict";


//  pulling info from Registration form 
const registerForm = document.querySelector("#register");

registerForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const registerData = {
       username: registerForm.username.value,
       fullName: registerForm.fullname.value,
        password: registerForm.password.value,
    }
console.log(registerData);
    // Disables the button after the form has been submitted already:
    registerForm.registerButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    register(registerData);
};

// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function register (registerData) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "username": registerData.username,
      "fullName": registerData.fullName,
      "password": registerData.password
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => window.location.assign('index.html'))

      .catch((error) => console.error(error));


            }

 
    //   window.localStorage.setItem("register-data", JSON.stringify(registerData));

            // return registerData;

// function getRegistrationData () {
//     const loginJSON = window.localStorage.getItem("register-data");
//     return JSON.parse(loginJSON) || {};
// }