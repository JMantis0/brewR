$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

// Input Group
let breweryDiv = $("<div>");
let formGroupDiv = $("<div>");
let brewerySearchInput = $("<input>");
let brewerysearchInput = $("<button>");

breweryDiv.addClass("form-group searchDiv");
breweryDiv.text("Brewery Search");

formGroupDiv.addClass("row-fluid searchDiv");

brewerySearchInput.addClass("form-control");
brewerySearchInput.attr("id", "foodType");
brewerySearchInput.attr("placeholder", "Type of Food...");

brewerysearchInput.addClass("btn");
brewerysearchInput.attr("id", "search-button");
brewerysearchInput.text("Search");

$(".profileDiv").append(breweryDiv);
$(".form-group").append(formGroupDiv);
$(".row-fluid").append(brewerySearchInput);
$(".form-group").append(brewerysearchInput);