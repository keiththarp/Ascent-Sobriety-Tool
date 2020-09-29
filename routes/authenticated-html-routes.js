const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
router.use("/", isAuthenticated);

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", (req, res) => {
//   // res.sendFile(path.join(__dirname, "../public/members.html"));
// });

router.get("/daily", isAuthenticated, (req, res) => {
  const hbsObj = {
    user: req.user
  };
  res.render("daily", hbsObj);
  // should only show once
});

router.get("/counter", isAuthenticated, (req, res) => {
  res.render("counter");
});

router.get("/resources", isAuthenticated, async (req, res) => {
  try {
    // const journalCat = JSON.parse(localStorage.getItem("journalCat"));
    const resources = await db.Resource.findAll({
      // where: {
      //   category: journalCat
      // },
      raw: true
    });
    const hbsObj = {
      resource: resources
    };
    console.log(hbsObj);
    res.render("resources", hbsObj);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

router.get("/journal", isAuthenticated, async (req, res) => {
  try {
    const checkin = await db.CheckIn.findAll({
      where: {
        authorId: req.user.id
      },
      raw: true
    });
    const hbsObj = {
      posts: checkin
    };
    console.log(hbsObj);
    res.render("journal", hbsObj);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
