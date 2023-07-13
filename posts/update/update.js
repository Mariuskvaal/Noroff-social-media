// Function to fetch a single post by ID
function getPostById(postId, token) {
  return fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch post");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching the post.");
    });
}

// Function to update a post by ID
function updatePost(postId, postData, token) {
  return fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (response.ok) {
        alert("Post updated successfully!");
      } else {
        throw new Error("Failed to update post");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while updating the post.");
    });
}

// Function to handle the form submission
function handleFormSubmit(event, postId, token) {
  event.preventDefault(); // Prevent the form from submitting and page reload

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const postData = {
    title: title,
    body: body
  };

  updatePost(postId, postData, token);
}

// Function to handle the search button click
function handleSearch() {
  const postId = document.getElementById("postId").value;
  const token = localStorage.getItem("token");

  getPostById(postId, token)
    .then(post => {
      // Fill the form fields with the post data
      document.getElementById("title").value = post.title;
      document.getElementById("body").value = post.body;
      document.getElementById("tags").value = post.tags;
      document.getElementById("media").value = post.media;

      // Enable the form and update button
      document.getElementById("updateForm").classList.remove("hidden");
      document.getElementById("updateButton").disabled = false;
    });
}

// Add event listener to the search button click event
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearch);

// Add event listener to the form submit event
const updateForm = document.getElementById("updateForm");
const updateButton = document.getElementById("updateButton");
updateButton.disabled = true; // Disable the update button initially
updateForm.addEventListener("submit", event => {
  handleFormSubmit(event, document.getElementById("postId").value, localStorage.getItem("token"));
});


