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
    .then((result) => getPost())
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
    <button class="btn btn-outline-primary like-button position-absolute top-0 end-0 mt-2 me-2">
        Like
    </button>
    <div class="card-body">
        <h5 class="card-title">&#9829; ${data.username}</h5>
        <p class="card-text">${data.text}</p>
        <div class="d-flex justify-content-between align-items-center">
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
        <div class="mt-3">
            <div class="d-flex align-items-center">
                <input type="text" class="form-control reply-input me-2" placeholder="Write a reply...">
                <button class="btn btn-secondary reply-button">Reply</button>
            </div>
        </div>
    </div>
</div>


            </div>
        `;

    theposts.appendChild(postCard);
  });
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