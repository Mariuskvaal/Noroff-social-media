const postsContainer = document.querySelector("#postsContainer");
const filterSelect = document.querySelector("#filterSelect");
const filterInput = document.querySelector("#filterInput");

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
      // Save posts in a property for filtering
      postsContainer.posts = posts;

      // Display the posts
      displayPosts(posts);
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    console.log(error);
    // Display an error message or handle the error gracefully
  }
}

// Function to display posts
function displayPosts(posts) {
  // Clear existing posts
  postsContainer.innerHTML = "";

  // Generate HTML content for posts
  const postsHTML = posts.map((post) => {
    return `
      <div class="container.for.posts">
        <h2 class="post.title.css">${post.title}</h2>
        <p class="post.body.css">${post.body}</p>
        ${post.media ? `<img class="post.image.css" src="${post.media}" alt="Post Image">` : ""}
      </div>
    `;
  }).join("");

  // Set the generated HTML content to the container
  postsContainer.innerHTML = postsHTML;
}

// Function to filter posts
function filterPosts() {
  const filterType = filterSelect.value;
  const searchTerm = filterInput.value.toLowerCase();

  // Filter posts
  let filteredPosts = postsContainer.posts;

  if (filterType === "image") {
    filteredPosts = filteredPosts.filter(post => post.media);
  } else if (filterType === "body") {
    filteredPosts = filteredPosts.filter(post => post.body && post.body.trim().length > 0);
  }

  // Filter by search term
  filteredPosts = filteredPosts.filter(post =>
    (post.title && post.title.toLowerCase().includes(searchTerm)) ||
    (post.body && post.body.toLowerCase().includes(searchTerm))
  );

  // Display the filtered posts
  displayPosts(filteredPosts);
}

// Event listeners for filter input and select
filterInput.addEventListener("input", filterPosts);
filterSelect.addEventListener("change", filterPosts);

// Call the function to fetch and display posts
fetchAndDisplayPosts();






