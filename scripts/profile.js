"use strict";



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
      .then((result) => { console.log(result);
        refreshPosts();})
    
      .catch((error) => console.error(error));

}



// function renderPost(postData) {
//     const theposts = document.getElementById("posts");
  
//     postData.forEach(data => {
//       const postCard = document.createElement("div");
//       postCard.classList.add("card", "mb-3");
//       postCard.style.maxWidth = "100%";
  
//       postCard.innerHTML = `
              
//       <div class="card position-relative">
     
//       <div class="card-body">
//           <h5 class="card-title">&#9829; ${data.username}</h5>
//           <p class="card-text">${data.text}</p>
//           <div class="d-flex justify-content-between align-items-center">
//               <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
//           </div>
//           <div class="mt-3 d-flex align-items-center">
//               <input type="text" class="form-control reply-input me-2" placeholder="Write a reply...">
//               <button class="btn btn-secondary reply-button">Reply</button>
              
//               <button class="btn btn-outline-danger ms-2">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//                   <path d="M8 14s-3-1.5-4-3C2.5 9.1 2 7.7 2 6.5 2 5.1 3.1 4 4.5 4 5.3 4 6 4.6 8 6.4 10 4.6 10.7 4 11.5 4 12.9 4 14 5.1 14 6.5c0 1.2-.5 2.6-2 4-1 1.5-4 3-4 3z"/>
//               </svg>
//           </button>
//           </div>
//       </div>
//   </div>

//               </div>
//           `;
  
//       theposts.appendChild(postCard);
  
//     });
//   }
  

function renderPost(postData) {
    const theposts = document.getElementById("posts");
    const loginData = getLoginData(); // Assuming you have a function to get login data
    
    // Filter posts based on username
    const filteredPosts = postData.filter(post => post.username === loginData.username);
  
    filteredPosts.forEach(data => {
        const postCard = document.createElement("div");
        postCard.classList.add("card", "mb-3");
        postCard.style.maxWidth = "100%";
    
        postCard.innerHTML = `
            <div class="card position-relative">
                <div class="card-body">
                    <h3 class="card-title">&#9829; ${data.username}</h3>
                    <p <h3 class="card-text">${data.text}</h4>
                    <div class="d-flex justify-content-between align-items-center">
                    <p class="fw-lighter" class="card-text"> created @ ${data.createdAt}</p>
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
        `;
    
        theposts.appendChild(postCard);
    });
}



function refreshPosts() {
    location.reload()
   }

   function closeFriends (){
    const myLogin = getLoginData();
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${myLogin.token}`);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0&username=NorthWest", requestOptions)
      .then((response) => response.json())
      .then((result) =>  {
        console.log(result)
        
        renderPost(result)
      })
      .catch((error) => console.error(error));

   }