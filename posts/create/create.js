function createPost(event) {
  event.preventDefault(); // Prevent the form from submitting and page reload

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const tags = document.getElementById("tags").value;
  const media = document.getElementById("media").value;

  const postData = {
    title: title,
    body: body,
    tags: tags ? tags.split(",") : [],
    media: media
  };

  const token = localStorage.getItem("token");

  // Call the API endpoint to create the post
  fetch("https://nf-api.onrender.com/api/v1/social/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (response.ok) {
        alert("Post created successfully!");
        // Optionally, you can clear the form fields here
      } else {
        throw new Error("Failed to create post");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while creating the post.");
    });
}

// Add event listener to the form submit event
const form = document.getElementById("registerForm");
form.addEventListener("submit", createPost);
