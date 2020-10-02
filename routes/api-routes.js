// store all /api routes

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in, otherwise send back an error
router.post("/signup", (req, res) => {
  return db.User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    soberSince: req.body.soberSince,
    stars: req.body.stars,
    weekBadge: 0,
    monthBadge: 0,
    yearBadge: 0
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for getting some data about our user to be used client side
router.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    res.send({
      // adding user data from DB structure
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      soberSince: req.user.soberSince,
      stars: req.user.stars,
      badgeOne: req.user.badgeOne,
      badgeTwo: req.user.badgeTwo,
      badgeThree: req.user.badgeThree,
      badgeFour: req.user.badgeFour,
      badgeFive: req.user.badgeFive,
      consDays: req.user.consDays,
      nextBadge: req.user.nextBadge
    });
  }
});

// user_data post request this would be specifically for register
router.post("/user_data", (req, res) => {
  res.json({
    soberSince: req.user.soberSince,
    stars: req.user.stars,
    nextBadge: req.user.nextBadge
  });
});

// get method to retrieve past journal entries in the server
router.get("/check-in/:id", (req, res) => {
  thisId = req.params.id;
  db.CheckIn.findAll({
    where: {
      authorId: thisId
    }
  }).then(checkIn => {
    res.json(checkIn);
  });
});

router.put("/soberDaysUpdate", (req, res) => {
  db.User.update(
    {
      consDays: req.body.consDays,
      stars: req.body.stars,
      badgeOne: req.body.badgeOne,
      badgeTwo: req.body.badgeTwo,
      badgeThree: req.body.badgeThree,
      badgeFour: req.body.badgeFour,
      badgeFive: req.body.badgeFive
    },
    {
      where: {
        id: req.body.id
      }
    })
    .then(dbUser => {
      res.json(dbUser);
    });
});

// Posting a check-in
router.post("/check-in", (req, res) => {
  console.log(req.body);
  db.CheckIn.create({
    authorId: req.body.authorId,
    body: req.body.body,
    feeling: req.body.feeling,
    hiccup: req.body.hiccup,
    postDate: req.body.postDate
  })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

module.exports = router;
