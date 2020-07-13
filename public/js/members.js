$(document).ready(() => {
  // Starter code
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  //  Load the current user's favorites to the favoriteColumn
  $.get("/api/members/loadFavorites").then(favorites => {
    // post favorites to the favorites column
    favorites.forEach(favorite => {
      $("#favoriteColumn").append(
        `<div class="card" id="fave${favorite.id}" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">${favorite.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Type: ${favorite.brewery_type}</h6>
            <p class="card-text">${favorite.city}, ${favorite.state}</p>
            <a href="${favorite.website_url}" class="card-link">${favorite.name} Home Page</a>
            <div class="buttonContainer">
              <button class="btn btn-primary" id="faveRemoveButton${favorite.id}" type="submit">Remove from Favorites</button>
            </div>
          </div>
        </div>`
      );
      $(`#faveRemoveButton${favorite.id}`).click(() => {
        $.ajax({
          method: "DELETE",
          url: `/api/members/favoriteDelete/${favorite.brewer_id}`
        }).then(() => {
          $(`#fave${favorite.id}`).remove();
        });
      });
    });
  });
});
