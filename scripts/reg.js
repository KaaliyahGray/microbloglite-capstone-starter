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

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function register (registerData) {
    // POST /api/users
    console.log(registerData);
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    };

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json()) // 
      //  console.log(response)
        .then(registerData => {
            if (registerData.message === "Invalid username or password") {
                console.error(registerData)
                // Here is where you might want to add an error notification 
                // or other visible indicator to the page so that the user is  
                // informed that they have entered the wrong login info.
                return null
            }

            window.localStorage.setItem("register-data", JSON.stringify(registerData));
           // window.location.assign('index.html');  // redirect

            return registerData;
        });
}

function getRegistrationData () {
    const loginJSON = window.localStorage.getItem("register-data");
    return JSON.parse(loginJSON) || {};
}