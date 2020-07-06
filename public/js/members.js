$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the pag
  // let queryUrl = `https://api.openbrewerydb.org/breweries`;
  let cityParam = "";
  let nameParam = "";
  let stateParam = "";
  let zipParam = "";

  if ($(".byCity").val()) {
    cityParam = `?${$(".byCity").val()}`;
    queryUrl += cityParam;
  }
  if ($(".byName").val()) {
    nameParam = `?${$(".byName").val()}`;
    queryUrl += nameParam;
  }
  if ($("byState").val()) {
    stateParam = `?${$(".byState").val()}`;
    queryUrl += stateParam;
  }
  if ($("byZip").val()) {
    zipParam = `?${$(".byZip").val()}`;
    queryUrl += zipParam;
  }
  // console.log(queryUrl);
  // $("brewerySearch").click(() => {});
});

$.get(queryUrl).then(data => {
  console.log(data);
});

$.get("/api/user_data").then(data => {
  $(".member-name").text(data.email);
});
