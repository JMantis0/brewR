// Functionality for brewery-page
$(document).ready(() => {
  let taplist;

  $(document).on("click", "button.delete", handleTaplistDelete);
  // Submits a new beer to On Tap List and brings user to brewer-page page upon completion
  function submitTaplist(Brewerybeer) {
    $.post("/api/taplist/", Brewerybeer, () => {
      window.location.href = "/brewer-page";
    });
  }

  $("#beerTypeButton").on("click", event => {
    event.preventDefault();

    const beerName = $("#beer-name");
    const beerStyle = $("#style");
    const abv = $("#abv");
    const hops = $("#hops");

    const beerValue = {
      beername: beerName.val().trim(),
      beerstyle: beerStyle.val().trim(),
      beerabv: abv.val().trim(),
      beerhops: hops.val().trim()
    };

    submitTaplist(beerValue);
  });

  // Submits a new beer to On Tap List and brings user to brewer-page page upon completion
  function submitTaplist(Brewerybeer) {
    $.post("/api/taplist/", Brewerybeer, () => {
      window.location.href = "/brewer-page";
    });
  }

  // This function grabs Brewerybeers from the database and updates the view
  function getTaplist(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/taplist" + categoryString, data => {
      taplist = data;
      for (let i = 0; i < data.length; i++) {
        const tapListItem = $("<li>");
        tapListItem.text(
          data[i].beername +
            " " +
            data[i].beerstyle +
            " " +
            data[i].beerabv +
            " " +
            data[i].beerhops
        );
        tapListItem.attr("id", "list-item-" + data[i].id);

        const deleteOntap = $("<button>");
        deleteOntap.text("x");
        deleteOntap.addClass("delete btn btn-danger");
        deleteOntap.attr("id", "delete-" + data[i].id);
        $("#ontapProfile").append(tapListItem);
        $("#list-item-" + data[i].id).append(deleteOntap);
        deleteOntap.data("data", data[i]);
        console.log(deleteOntap);
      }
    });
  }
  getTaplist();

  // This function does an API call to delete posts
  function deleteTaplist(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/taplist/" + id
    }).then(() => {
      // getTaplist(postCategorySelect.val());
      location.reload;
    });
  }

  // This function figures out which Brewerybeer we want to delete and then calls
  // deleteTaplist
  function handleTaplistDelete() {
    const currentBrewerybeer = $(this).data("data");
    deleteTaplist(currentBrewerybeer);
    console.log(currentBrewerybeer);
  }
});
