

"use strict";

"use strict";

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

function createPost(newPost) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    };

    return fetch(apiBaseURL + "/api/posts", options) // Corrected endpoint to /api/posts
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();
        })
        .then(postData => {
            // Assuming successful creation, handle response
            return postData;
        })
        .catch(error => {
            console.error('Error creating post:', error);
            throw error;
        });
}


function renderPost(postData) {
    const main = document.querySelector("main");

    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
        <h2>Post ID: ${postData.id}</h2>
        <p>${postData.post}</p>
        <hr>
    `;

    main.appendChild(postElement);
}

  