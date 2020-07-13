// this is where the blog post js starts
$(document).ready(() => {
  //  LOAD THE USER'S FAVORITES UP
  $.get("/api/members/loadFavorites").then(favorites => {
    // post favorites to the favorites column
    favorites.forEach(favorite => {
      $("#breweryContainer").append(
        `<div class="card" id="fave${favorite.id}" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">${favorite.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Type: ${favorite.brewery_type}</h6>
            <p class="card-text">${favorite.city}, ${favorite.state}</p>
            <a href="${favorite.website_url}" class="card-link">${favorite.name} Home Page</a>
          </div>
        </div>`
      );
    });
  });

  // THIS IS WHERE THE MEMBERS BLOG CMS CODE STARTS
  const url = window.location.search;
  let postId;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }
  // Getting jQuery references to the post body
  const bodyInput = $("#body");
  const cmsForm = $("#cms");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", event => {
    event.preventDefault();
    // Wont submit the post if we are missing a body
    if (!bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    const newPost = {
      body: bodyInput.val().trim()
    };
    console.log(newPost);
    submitPost(newPost);
  });

  // THIS IS WHERE THE BLOG FEED CODE STARTS
  // blogContainer holds all of our posts
  const blogContainer = $(".blog-container");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  let posts;

  // This function grabs posts from the database and updates the view
  function getPosts() {
    $.get("/api/posts", data => {
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    const postsToAdd = [];
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.unshift(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    const newPostCard = $("<div>");
    newPostCard.addClass("card");
    const newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    const newPostCategory = $("<h5>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    const newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    const newPostBody = $("<p>");
    newPostBody.text(post.body);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    const currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    cardElement = $(this)
      .parent()
      .parent();
    deletePost(cardElement, currentPost.id);
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    const messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html("This member has no blog posts yet");
    blogContainer.append(messageH2);
  }
});
