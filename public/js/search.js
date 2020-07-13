$(document).ready(() => {
  //  $("#searchType") is the <select> element that user selects how they'd like to search.
  //  This event listener detects when a new selection is made by the user.
  //  Each <option> is set up with a data attribute "value", which contains a piece of
  //  querystring used to set up the parameter.
  $("#searchType").on("change", function (event) {
    //  Text of the <option> is used to set up a switch, which makes the appropriate
    //  input visible, and the other inputs invisible.
    let searchType = this.options[this.selectedIndex].text;
    switch (searchType) {
      case "Name":
      case "City":
      case "Zip Code":
        $("#searchInput").removeClass("hidden").attr("placeholder", `Enter ${searchType}`);
        $("#stateInput").addClass("hidden");
        $("#typeInput").addClass("hidden");
        break;
      case "State":
        $("#searchInput").addClass("hidden");
        $("#stateInput").removeClass("hidden");
        $("#typeInput").addClass("hidden");
        break;
      case "Brewery Type":
        $("#searchInput").addClass("hidden");
        $("#typeInput").removeClass("hidden");
        $("#stateInput").addClass("hidden");
        break;
      case "Search by...":
        $("#searchInput").addClass("hidden");
        $("#stateInput").addClass("hidden");
        $("#typeInput").addClass("hidden");
        break;
    }
  });

  //  When the search button is clicked a queryString bit is constructed using the current
  //  State of the searchinput and type selector.
  $('#searchBtn').click(function (event) {
    event.preventDefault();
  
    let searchBy = $('#searchType')[0].options[$('#searchType')[0].selectedIndex].value;
    let parameter;
    switch (searchBy) {
      case "1":
      case "2":
      case "3":
        parameter = $('#searchInput').val();
        break;
      case "4":
        parameter = $('#stateInput').val();
        break;
      case "5":
        parameter = $('#typeInput').val();
    }
    $.get(`/api/search/${searchBy}/${parameter}`)
    //  get brewery search results back from the server side and render!!
    //  breweries variable is coming from line 72 in api-routes.js
    .then(function (breweries) {
      $("#breweryContainer").empty();
      $("#breweryContainer").append(`<h1>Search Results:</h1>`);
      breweries.forEach((brewery) => {
        $("#breweryContainer").append(
          `
          <div class="card" id="${brewery.id}" style="width: 100%;">
            <div class="card-body">
              <h5 class="card-title">${brewery.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Type: ${brewery.brewery_type}</h6>
              <p class="card-text">${brewery.city}, ${brewery.state}</p>
              <a href="${brewery.website_url}" class="card-link">${brewery.name} Home Page</a>
              <div class="buttonContainer">
                <button class="btn btn-primary" id="faveAddButton${brewery.id}" type="submit">Add to Favorites</button>
              </div>
            </div>
          </div>
          `);

          //Now add listeners to the buttons on each card
        $(`#faveAddButton${brewery.id}`).on("click", function(event) {
          //  Add Code here that prevents the data from being duplicated and entered into the
          //  Favorites table as a record more than once.
          $.post("/api/members/favoriteAdd", brewery);
          //  Check to see if the div has already been rendered to the favorites list.  Only render
          //  the new favorite if it has not already been rendered.  It Works!!
          if(!$(`#fave${brewery.id}`)[0]) {
            $("#favoriteColumn").prepend(
              `<div class="card" id="fave${brewery.id}" style="width: 100%;">
                <div class="card-body">
                  <h5 class="card-title">${brewery.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Type: ${brewery.brewery_type}</h6>
                  <p class="card-text">${brewery.city}, ${brewery.state}</p>
                  <a href="${brewery.website_url}" class="card-link">${brewery.name} Home Page</a>
                  <div class="buttonContainer">
                    <button class="btn btn-primary" id="faveRemoveButton${brewery.id}" type="submit">Remove from Favorites</button>
                  </div>
                </div>
              </div>`);

            //  Add event listener to the delete button on cards that are created by the click on faveAddButtons
            $(`#faveRemoveButton${brewery.id}`).click(function(event) {
              $.ajax({
                method: "DELETE",
                url: `/api/members/favoriteDelete/${brewery.id}`
              }).then(() => {
                $(`#fave${brewery.id}`).remove()
              });
            });
          }
        });
      });
    });
  });
});