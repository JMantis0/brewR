// Functionality for brewer-feed
$(document).ready(() => {
  let taplist;

  // This function grabs Brewerybeers from the database and updates the view
  function getTaplist(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/taplist" + categoryString, data => {
      taplist = data;
      for (let i = 0; i < data.length; i++) {
        const tapListBeer = $("<h5>");
        const tapListStyle = $("<h5>");
        const tapListHops = $("<h5>");
        const tapListABV = $("<h5>");

        tapListBeer.addClass("col-4");
        tapListBeer.text(data[i].beername);
        tapListStyle.addClass("col-4");
        tapListStyle.text(data[i].beerstyle);
        tapListHops.addClass("col-3");
        tapListHops.text(data[i].beerhops);
        tapListABV.addClass("col-1");
        tapListABV.text(data[i].beerabv);

        $("#ontapFeed").append(tapListBeer);
        $("#ontapFeed").append(tapListStyle);
        $("#ontapFeed").append(tapListHops);
        $("#ontapFeed").append(tapListABV);
      }
    });
  }
  getTaplist();
});
