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
  
  // Function to delete a post by ID
  function deletePost(postId, token) {
    return fetch(`https://nf-api.onrender.com/api/v1/social/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          alert("Post deleted successfully!");
        } else {
          throw new Error("Failed to delete post");
        }
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while deleting the post.");
      });
  }
  
  // Function to handle the form submission
  function handleFormSubmit(event, postId, token) {
    event.preventDefault(); // Prevent the form from submitting and page reload
    deletePost(postId, token);
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
  
        // Enable the form and delete button
        document.getElementById("deleteForm").classList.remove("hidden");
        document.getElementById("deleteButton").disabled = false;
      });
  }
  
  // Add event listener to the search button click event
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", handleSearch);
  
  // Add event listener to the form submit event
  const deleteForm = document.getElementById("deleteForm");
  const deleteButton = document.getElementById("deleteButton");
  deleteButton.disabled = true; // Disable the delete button initially
  deleteForm.addEventListener("submit", event => {
    handleFormSubmit(event, document.getElementById("postId").value, localStorage.getItem("token"));
  });
  
  