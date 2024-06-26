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
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}








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
                <div class="col-md-5">
                    <div class="card-body">
                   <h5 class="card-title">${data.username}</h5>
                        <p class="card-text">${data.text}</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        `;

        theposts.appendChild(postCard);
    });
}


