const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
router.use("/", isAuthenticated);

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", (req, res) => {
//   // res.sendFile(path.join(__dirname, "../public/members.html"));
// });

router.get("/daily", isAuthenticated, (req, res) => {
  res.render("daily");
  // should only show once
});

router.get("/counter", isAuthenticated, (req, res) => {
  res.render("counter");
});

router.get("/resources", isAuthenticated, (req, res) => {
  res.render("resources");
});

router.get("/journal", isAuthenticated, (req, res) => {
  res.render("journal");
});

module.exports = router;
