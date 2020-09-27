// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      soberSince: req.body.soberSince
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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
        // adding user data from DB structure
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        soberSince: req.user.soberSince,
        stars: req.user.stars,
        nextBadge: req.user.nextBadge
      });
    }
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data/:id", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(data => {
          res.json({
            // adding user data from DB structure
            id: data.id,
            email: data.email,
            name: data.name,
            soberSince: data.soberSince,
            stars: data.stars,
            nextBadge: data.nextBadge
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  // template for app.post to make sure post is working in postman
  app.post("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        soberSince: res.user.soberSince,
        stars: res.user.stars,
        nextBadge: res.user.nextBadge
      });
    }
  });
};
