"use strict";

window.onload= function (){getPost()};

// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

const postForm = document.querySelector("#postForm"); // Corrected form selector

postForm.onsubmit = function (event) {
    event.preventDefault();

    const newPost = {
        "_id": "string",
        "text": "string",
        "username": "string",
        "createdAt": "2024-06-22T07:40:54.312Z",
        "likes": [
          {
            "_id": "string",
            "username": "string",
            "postId": "string",
            "createdAt": "2024-06-22T07:40:54.313Z"
          }
        ]
    };

    // Disable the submit button after the form has been submitted
    postForm.querySelector("#postButton").disabled = true;

    createPost(newPost)
        .then(response => {
            // Handle successful response
            console.log("Post created successfully:", response);
            // Optionally, update UI or redirect after successful post
        })
        .catch(error => {
            // Handle error
            console.error("Failed to create post:", error);
            // Optionally, display error message to the user
        });
};




function createPost() {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    const loginData = getLoginData();

    myHeaders.append("Authorization", `Bearer ${loginData.token}`);
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "text": `${document.getElementById("input").value}`
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}

// function renderPost(postData) {
//    // console.log(postData);
// let postArray = [];
//     const loginData = getLoginData();
//     const theposts = document.getElementById("posts");
//     postArray.push(postData);
//   //  console.log(postArray);
//     postData.forEach(data => {
//         console.log(data.text)
//     const postElement = document.createElement("posts");
//     postElement.classList.add("post");
//     postElement.innerHTML = `
//     <div class="card-body">
//         <h2>Post ID: ${data.username}</h2>
//         <p>${data.text}</p>
//         <hr>
//         </div>
//     `;

//     theposts.appendChild(postElement)
//     ;
// });

// }

function renderPost(postData) {
    const theposts = document.getElementById("posts");

    postData.forEach(data => {
        const postCard = document.createElement("div");
        postCard.classList.add("card", "mb-3");
        postCard.style.maxWidth = "540px";

        postCard.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="..." class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                    <h5 class="card-title">${data.username}</h5>
                    <p class="card-text">${data.text}</p>
                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    <button class="btn btn-primary like-button" data-post-id="${data.postId}">Like</button>
                </div>
            </div>
        </div>
        `;

        theposts.appendChild(postCard);
    });
}




function getPost(){
    const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
const loginData = getLoginData();

myHeaders.append("Authorization", `Bearer ${loginData.token}`);
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=300&offset=0", requestOptions)
  .then((response) => response.json())
  .then((result) => renderPost(result))
  .catch((error) => console.error(error));
}


function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}




// like a post 

function likeaPost(){
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBoYXJlbGwgV2lsbGlhbXMiLCJpYXQiOjE3MTkyNzAwMjUsImV4cCI6MTcxOTM1NjQyNX0.HvuhVePwjXVgth2LYgHAQ77zA-DAWI9jU7s3hXlazjk");
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "postId": "string"
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}