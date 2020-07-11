// Functionality for brewery-page
$(document).ready(() => {
  let taplist;

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

  // This function grabs posts from the database and updates the view
  function getTaplist(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/taplist" + categoryString, data => {
      taplist = data;
      for (let i = 0; i < data.length; i++) {
        const tapListItem = $("<h1>");
        tapListItem.text(
          data[i].beername +
            " " +
            data[i].beerstyle +
            " " +
            data[i].beerabv +
            " " +
            data[i].beerhops
        );
        $("#onTap").append(tapListItem);
      }
    });
  }
  getTaplist();
});
