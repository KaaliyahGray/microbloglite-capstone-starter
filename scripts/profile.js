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
                        <button class="btn btn-primary like-button" data-post-id="${data.postId}">Like</button>
                    </div>
                </div>
            </div>
        `;

        theposts.appendChild(postCard);
    });
}