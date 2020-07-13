// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
  // route loads members feed page
  app.get("/member-feed", isAuthenticated, (req, res) => {
    res.render("member-feed");
  });

  // brewer page
  app.get("/brewer-page", isAuthenticated, (req, res) => {
    res.render("brewer-page");
  });

  // brewer feed
  app.get("/brewer-feed", isAuthenticated, (req, res) => {
    res.render("brewer-feed");
  });

  // support page
  app.get("/support", isAuthenticated, (req, res) => {
    res.render("support");
  });
};
