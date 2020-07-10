// Functionality for brewery-page
$(document).ready(() => {
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
    console.log(beerValue);

    submitTaplist(beerValue);
  });

  // Submits a new beer to On Tap List and brings user to brewer-page page upon completion
  function submitTaplist(Brewerybeer) {
    $.post("/api/taplist/", Brewerybeer, () => {
      window.location.href = "/brewer-page";
    });
  }
});
