$(document).ready(() => {
  //  $("#searchType") is the <select> element that user selects how they'd like to search.
  //  This event listener detects when a new selection is made by the user.
  //  Each <option> is set up with a data attribute "value", which contains a piece of
  //  querystring used to set up the parameter.
  $("#searchType").on("change", function(event) {
    //  Text of the <option> is used to set up a switch, which makes the appropriate
    //  input visible, and the other inputs invisible.
    let searchType = this.options[this.selectedIndex].text;
    switch(searchType) {
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
  $('#searchBtn').click(function(event) {
    event.preventDefault();
    console.log("click")
    let searchBy = $('#searchType')[0].options[$('#searchType')[0].selectedIndex].value;
    let parameter;
    switch(searchBy) {
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
    console.log(searchBy, parameter)
    $.get(`/api/search/${searchBy}/${parameter}`);
  });    

});