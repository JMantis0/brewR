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

  // This function grabs Breweryhour from the database and updates the view
  function getHours(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/hours" + categoryString, data => {
      const setMonday = $("<h7>");
      const setTuesday = $("<h7>");
      const setWednesday = $("<h7>");
      const setThursday = $("<h7>");
      const setFriday = $("<h7>");
      const setSaturday = $("<h7>");
      const setSunday = $("<h7>");

      setMonday.addClass("col-6");
      setMonday.text(data[0].monday);
      setTuesday.addClass("col-6");
      setTuesday.text(data[0].tuesday);
      setWednesday.addClass("col-6");
      setWednesday.text(data[0].wednesday);
      setThursday.addClass("col-6");
      setThursday.text(data[0].thursday);
      setFriday.addClass("col-6");
      setFriday.text(data[0].friday);
      setSaturday.addClass("col-6");
      setSaturday.text(data[0].saturday);
      setSunday.addClass("col-6");
      setSunday.text(data[0].sunday);

      $("#mondayFeed").append(setMonday);
      $("#tuesdayFeed").append(setTuesday);
      $("#wednesdayFeed").append(setWednesday);
      $("#thursdayFeed").append(setThursday);
      $("#fridayFeed").append(setFriday);
      $("#saturdayFeed").append(setSaturday);
      $("#sundayFeed").append(setSunday);
      // }
      console.log(data);
    });
  }
  getHours();

  // This function grabs Breweryhour from the database and updates the view
  function getInfo(category) {
    let categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/info" + categoryString, data => {
      const setBreweryName = $("<h1>");
      const setBreweryAddress = $("<h7>");
      const setBreweryPhone = $("<h7>");
      const setBreweryDogs = $("<h7>");

      setBreweryName.addClass("col-6");
      setBreweryName.text(data[0].breweryname);
      setBreweryAddress.addClass("col-6");
      setBreweryAddress.text(data[0].address);
      setBreweryPhone.addClass("col-6");
      setBreweryPhone.text(data[0].phonenumber);
      setBreweryDogs.addClass("col-6");
      setBreweryDogs.text(data[0].dogs);

      $("#breweryName").append(setBreweryName);
      $("#breweryAddress").append(setBreweryAddress);
      $("#breweryPhone").append(setBreweryPhone);
      $("#breweryDogs").append(setBreweryDogs);
    });
  }
  getInfo();
});
