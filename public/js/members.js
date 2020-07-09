$(document).ready(() => {
  // $("#searchType").on("change", function(event) {
  //   const searchType = this.options[this.selectedIndex].text;
  //   switch (searchType) {
  //   case "Name":
  //   case "City":
  //   case "Zip Code":
  //     $("#searchInput")
  //       .removeClass("hidden")
  //       .attr("placeholder", `Enter ${searchType}`);
  //     $("#stateInput").addClass("hidden");
  //     $("#typeInput").addClass("hidden");
  //     break;
  //   case "State":
  //     $("#searchInput").addClass("hidden");
  //     $("#stateInput").removeClass("hidden");
  //     $("#typeInput").addClass("hidden");
  //     break;
  //   case "Brewery Type":
  //     $("#searchInput").addClass("hidden");
  //     $("#typeInput").removeClass("hidden");
  //     $("#stateInput").addClass("hidden");
  //     break;
  //   case "Search by...":
  //     $("#searchInput").addClass("hidden");
  //     $("#stateInput").addClass("hidden");
  //     $("#typeInput").addClass("hidden");
  //     break;
  //   }
  // });

  // $("#searchBtn").click(event => {
  //   const searchBy = $("#searchType")[0].options[
  //     $("#searchType")[0].selectedIndex
  //   ].value;
  //   let parameter;
  //   switch (searchBy) {
  //   case "?by_zip":
  //   case "?by_city":
  //   case "?by_name":
  //     parameter = $("#searchInput").val();
  //     break;
  //   case "?by_state":
  //     parameter = $("#stateInput").val();
  //     break;
  //   case "?by_type":
  //     parameter = $("#typeInput").val();
  //   }
  //   const queryUrl = `https://api.openbrewerydb.org/breweries${searchBy}=${parameter}&per_page=50`;

  //   $.get(queryUrl).then((err, data) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(data);
  //   });
  // });

  // Starter code
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
