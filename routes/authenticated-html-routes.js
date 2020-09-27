const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
router.use("/", isAuthenticated);

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

router.get("/counter", (req, res) => {
  //as long as the use is logged in...
  res.render("counter");
});

module.exports = router;
