// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", { title: "Hello World!" });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", null);
  });

  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // member feed
  app.get("/member-feed", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/member-feed.html"));
  });

  // brewer page
  app.get("/brewer-page", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/brewer-page.html"));
  });

  // brewer feed
  app.get("/brewer-feed", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/brewer-feed.html"));
  });
};
