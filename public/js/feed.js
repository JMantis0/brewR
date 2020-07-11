// this is where the blog post js starts
$(document).ready(() => {
  // blogContainer holds all of our posts
  const blogContainer = $(".blog-container");
  const postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  let posts;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, data => {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(() => {
      getPosts(postCategorySelect.val());
    });
  }

  // Getting the initial list of posts
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
    const deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    const newPostTitle = $("<h2>");
    const newPostDate = $("<small>");
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
    let formattedDate = new Date(post.createdAt);
    newPostDate.text(formattedDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
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
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    const currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/members?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    const messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html(
      "No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post."
    );
    blogContainer.append(messageH2);
  }

//   This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    const newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }
});
