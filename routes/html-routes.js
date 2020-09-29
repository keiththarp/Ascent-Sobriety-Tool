// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
// var user = require("../models/user");
// Requiring our custom middleware for checking if a user is logged in
const router = require("express").Router();

// module.exports = function(app) {
router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/daily");
  // }
  res.render("start");
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/daily");
  // }
  res.render("login");
});

router.get("/register", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/daily");
  // }
  res.render("register");
});

// app.get waiting for get
// see if any mw cred to check first (do that)
// if pass mw will call next fx
// then handle response
// app.get("/daily", (req, res) => {
//   // If the user isn't logged in, send them to the login page
//   if (!req.user) {
//     res.redirect("/login");
//   }

//   const hbsObj = {
//     user: req.user
//   };

//   res.render("daily", hbsObj);
// });

// app.get("/counter", (req, res) => {
//   // If the user already has an account send them to the members page
//   // if (!req.user) {
//   //   res.redirect("/login");
//   // }

//   res.render("counter");
// });

// app.get("/journal", (req, res) => {
//   // If the user already has an account send them to the members page
//   // if (!req.user) {
//   //   res.redirect("/login");
//   // }

//   const hbsObj = {
//     user: req.user
//   };

//   res.render("journal", hbsObj);
// });

// app.get("/resources", (req, res) => {
//   if (req.user) {
//     res.render("resources");
//   } else {
//     res.redirect("login");
//   }
// });

// // This will need to be an authenticated route at some point
// app.get("/counter", (req, res) => {
//   // if (req.user) {
//   res.render("counter");
//   // }
//   // res.redirect("start");
// });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
// };

module.exports = router;
