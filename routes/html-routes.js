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
    // db.Post.findAll({}).then(data => {
    //   console.log(data.Post);
    //   res.json(data.Post);
    // });
    res.render("members");
  });

  // member feed blog posts (public facing)
  app.get("/member-feed", (req, res) => {
    console.log("success");
    db.Post.findAll({}).then(data => {
      console.log(data, "39");
      const x = data.map(packet => packet.dataValues.body);
      console.log(x, "41");
      obj = [];
      for (message of x) {
        obj.push({ body: message });
      }
      console.log(obj, "46");
      res.render("member-feed", { Post: obj });
    });
  });
  
  // brewer page
  app.get("/brewer-page", isAuthenticated, (req, res) => {
    res.render("brewer-page");
  });

  // brewer feed
  app.get("/brewer-feed", isAuthenticated, (req, res) => {
    res.render("brewer-feed");
  });

  // app.get("/api/members", (req, res) => {
  //   db.Post.findAll({}).then(data => {
  //     console.log(data.Post);
  //     res.json(data.Post);
  //   });
  // });
};
