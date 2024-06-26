/* Landing Page JavaScript */

"use strict";

// pulling info from login form
const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};

document.addEventListener("DOMContentLoaded", function() {
    const numStars = 100; // Increase the number of stars
    const starContainer = document.getElementById("stars");

    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.animationDelay = `${Math.random() * 10}s`; // Randomize animation delay
        star.style.left = `${Math.random() * 100}vw`; // Randomize horizontal position
        star.style.top = `${Math.random() * 100}vh`; // Randomize vertical position
        starContainer.appendChild(star);
    }
});

