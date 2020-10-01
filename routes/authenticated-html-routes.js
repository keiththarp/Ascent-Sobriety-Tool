const router = require("express").Router();
// Here we've add our isAuthenticated middleware to this route.
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
// router.use("/", isAuthenticated);

// A user must be authenticated to access the below routes
router.get("/daily", isAuthenticated, (req, res) => {
  const hbsObj = {
    user: req.user
  };
  res.render("daily", hbsObj);
});

//Because req.user is loaded on login the data is not being updated on page load.
router.get("/counter", isAuthenticated, (req, res) => {
  const hbsObj = {
    user: req.user
  };
  res.render("counter", hbsObj);
});

router.get("/submit", isAuthenticated, (req, res) => {
  const hbsObj = {
    user: req.user
  };
  res.render("submit", hbsObj);
});

router.get("/resources", isAuthenticated, async (req, res) => {
  try {
    const resources = await db.Resource.findAll({
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
