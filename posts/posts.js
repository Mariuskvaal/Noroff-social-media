const postsContainer = document.querySelector("#postsContainer");

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage or another source

    const response = await fetch("https://nf-api.onrender.com/api/v1/social/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const posts = await response.json();

    if (response.ok) {
      // Clear existing posts
      postsContainer.innerHTML = "";

      // Generate HTML content for posts
      const postsHTML = posts.map((post) => {
        return `
          <div class="container.for.posts">
            <h2 class="post.title.css">${post.title}</h2>
            <p class="post.body.css">${post.body}</p>
            <img class="post.image.css" src="${post.media}" alt="Post Image">
          </div>
        `;
      }).join("");

      // Set the generated HTML content to the container
      postsContainer.innerHTML = postsHTML;
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    console.log(error);
    // Display an error message or handle the error gracefully
  }
}

// Call the function to fetch and display posts
fetchAndDisplayPosts();
