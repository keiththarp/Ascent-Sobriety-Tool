// Requiring our custom middleware for checking if a user is logged in
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("start");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
