// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      usertype: req.user.usertype
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      usertype: req.body.usertype
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Routes for page redirection
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for viewing member public pofile feed
  app.get("/profilemembers", (req, res) => {
    res.redirect("/member-feed");
  });

  // Route for sending user back to member home
  app.get("/homemembers", (req, res) => {
    res.redirect("/members");
  });

  // Route for viewing brewery public profile feed
  app.get("/profilebrewery", (req, res) => {
    res.redirect("/brewer-feed");
  });

  // Route for sending user back to brewery home
  app.get("/homebrewery", (req, res) => {
    res.redirect("/brewer-page");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //  Receive search parameters from client, call open brewery api
  //  return data for rendering
  app.get("/api/search/:type/:search", (req, res) => {
    const typeMap = {
      1: "?by_name",
      2: "?by_city",
      3: "?by_postal",
      4: "?by_state",
      5: "?by_type"
    };

    //  Call Open Brewery API within axios.get
    axios
      .get(
        `https://api.openbrewerydb.org/breweries${typeMap[req.params.type]}=${
          req.params.search
        }`
      )
      .then(brewerySearch => {
        const breweriesInfo = brewerySearch.data;
        //  Send breweries Info to the front!  Check browser console to see what the response looks like
        res.send(breweriesInfo);
      })
      .catch(error => {
        console.log(error);
      });
  });

  app.delete("/api/members/favoriteDelete/:brewerID", (req, res) => {
    db.Fave.destroy({
      where: {
        brewer_id: req.params.brewerID
      }
    });
    res.sendStatus(200);
  });

  //  Route sends back favorites for user making the request

  app.get("/api/members/loadFavorites", (req, res) => {
    db.Fave.findAll({
      where: {
        UserID: req.user.id
      }
    }).then(userFaves => {
      res.send(userFaves);
    });
  });

  app.post("/api/members/favoriteAdd", (req, res) => {
    //This code checks to see if the a data entry already exists for the brewery.
    //  If the entry exists, no need to enter it into the database again!

    db.Fave.count({
      where: {
        brewer_id: req.body.id
      }
    }).then(count => {
      if (count === 0) {
        db.Fave.create({
          UserId: req.user.id,
          brewer_id: req.body.id,
          name: req.body.name,
          brewery_type: req.body.brewery_type,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          postal_code: req.body.postal_code,
          country: req.body.country,
          phone: req.body.phone,
          website: req.body.website
        });
        res.json(req.body);
      }
    });
  });

  // blog posts crud starts here
  // GET route for getting all of the posts
  app.get("/api/posts/", (req, res) => {
    //Get all posts that belong to the current user
    db.Post.findAll({
      where: {
        UserID: req.user.id
      }
    }).then(userposts => {
      res.json(userposts);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res) => {
    db.Post.create({
      // title: req.body.title,
      body: req.body.body,
      UserId: req.user.id
      // category: req.body.category
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.json(data).end();
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data).end();
    });
  });

  //Brewery routes
  // GET route for retrieiving On Tap List for specific user
  app.get("/api/taplist", (req, res) => {
    db.Brewerybeer.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // POST route for saving a beer to On Tap List
  app.post("/api/taplist", (req, res) => {
    db.Brewerybeer.create({
      beername: req.body.beername,
      beerstyle: req.body.beerstyle,
      beerabv: req.body.beerabv,
      beerhops: req.body.beerhops,
      UserId: req.user.id
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for deleting beer off of On Tap List
  app.delete("/api/taplist/:id", (req, res) => {
    db.Brewerybeer.destroy({
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.json(data).end();
    });
  });

  // Hours of Operation routes
  // GET route for retrieving hours for specific user
  app.get("/api/hours", (req, res) => {
    db.Breweryhour.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // POST route for saving hours to db
  app.post("/api/hours", (req, res) => {
    db.Breweryhour.create({
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
      UserId: req.user.id
    }).then(data => {
      res.json(data);
    });
  });

  // PUT route for updating hours
  app.put("/api/hours", (req, res) => {
    db.Breweryhour.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // Brewery Information
  // GET route for retrieving brewery info for specific user
  app.get("/api/info", (req, res) => {
    db.Breweryinfo.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // POST route for saving brewery info to On Tap List
  app.post("/api/info", (req, res) => {
    db.Breweryinfo.create({
      breweryname: req.body.breweryname,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      dogs: req.body.dogs,
      UserId: req.user.id
    }).then(data => {
      res.json(data);
    });
  });

  // PUT route for updating hours
  app.put("/api/info", (req, res) => {
    db.Breweryinfo.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data);
    });
  });
};
