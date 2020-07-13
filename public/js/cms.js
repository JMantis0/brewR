/* eslint-disable no-let */
$(document).ready(() => {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  const url = window.location.search;
  let postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  // let updating = false;

  // If we have this section in our url, we pull out the post id from the url
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
    submitPost(newPost);
  });

  function clear() {
    document.getElementById("body").value = "";
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, newPost => {
      //  Render new post to the page
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
      newPostCategory.text(newPost.category);
      newPostCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top": "-15px"
      });
      const newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      const newPostBody = $("<p>");
      newPostBody.text(newPost.body);
      const formattedDate = new Date(newPost.createdAt);
      newPostDate.text(formattedDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostCategory);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", newPost);
      $(".blog-container").prepend(newPostCard);
    });

    clear();
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, data => {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
});
