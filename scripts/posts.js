"use strict";

window.onload = function () { getPost() };

// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

const postForm = document.querySelector("#postForm"); // Corrected form selector

postForm.onsubmit = function (event) {
  event.preventDefault();

  createPost();
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
    .then((response) => response.json())
    .then((result) => { console.log(result);
      refreshPosts();})
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
    postCard.style.maxWidth = "100%";

    postCard.innerHTML = `
            
    <div class="card position-relative">
   
    <div class="card-body">
        <h5 class="card-title">&#9829; ${data.username}</h5>
        <p class="card-text">${data.text}</p>
        <div class="d-flex justify-content-between align-items-center">
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        <div class="mt-3 d-flex align-items-center">
            <input type="text" class="form-control reply-input me-2" placeholder="Write a reply...">
            <button class="btn btn-secondary reply-button">Reply</button>
            
            <button class="btn btn-outline-danger ms-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 14s-3-1.5-4-3C2.5 9.1 2 7.7 2 6.5 2 5.1 3.1 4 4.5 4 5.3 4 6 4.6 8 6.4 10 4.6 10.7 4 11.5 4 12.9 4 14 5.1 14 6.5c0 1.2-.5 2.6-2 4-1 1.5-4 3-4 3z"/>
            </svg>
        </button>
        </div>
    </div>
</div>





            </div>
        `;

    theposts.appendChild(postCard);

  });
}


function refreshPosts() {
 location.reload()
}

function getPost() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  const loginData = getLoginData();

  myHeaders.append("Authorization", `Bearer ${loginData.token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=15&offset=0", requestOptions)
    .then((response) => response.json())
    .then((result) => renderPost(result))
    .catch((error) => console.error(error));
}


function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}




// like a post 

function likeaPost() {
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