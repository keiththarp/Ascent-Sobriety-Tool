// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
// var user = require("../models/user");
// Requiring our custom middleware for checking if a user is logged in

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/daily");
    }
    res.render("start");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/daily");
    }
    res.render("login");
  });

  app.get("/register", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/daily");
    }
    res.render("register");
  });

  app.get("/daily", (req, res) => {
    // If the user isn't logged in, send them to the login page
    if (!req.user) {
      res.redirect("/login");
    }

    res.render("daily");
  });

  app.get("/counter", (req, res) => {
    // If the user already has an account send them to the members page
    // if (!req.user) {
    //   res.redirect("/login");
    // }

    res.render("counter");
  });

  app.get("/journal", (req, res) => {
    // If the user already has an account send them to the members page
    // if (!req.user) {
    //   res.redirect("/login");
    // }

    res.render("journal");
  });

  app.get("/resources", (req, res) => {
    // if (req.user) {
    //   res.render("resources");
    // }
    // res.redirect("/login");
    res.render("resources");
  });

  // This will need to be an authenticated route at some point
  app.get("/counter", (req, res) => {
    // if (req.user) {
    res.render("counter");
    // }
    // res.redirect("start");
  });
};
