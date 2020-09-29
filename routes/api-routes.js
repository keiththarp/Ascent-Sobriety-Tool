// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
// module.exports = function(app) {
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
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
      if (error) {
        res.redirect("/");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/daily");
        });
      }
    })
    .catch(err => {
      console.log(req.body);
      res.status(401).json(err);
    });
});

// app.post('/sign', function(req, res){
//   authProvider.saveUser(req.body, function(error, user){
//       if(error){
//           res.redirect('/');
//       } else {
//           passport.authenticate('local')(req, res, function () {
//               res.redirect('/');
//           })
//       }
//   });
// });

// Route for getting some data about our user to be used client side
router.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.send({
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

// user_data post request this would be specifically for register
router.post("/user_data", (req, res) => {
  // if (!req.user) {
  //   res.json({});
  // } else {
  res.json({
    soberSince: req.user.soberSince,
    stars: req.user.stars,
    nextBadge: req.user.nextBadge
  });
});

router.get("/resources/", (req, res) => {
  const journalCat = JSON.parse(localStorage.getItem("journalCat"));
  db.resources
    .findAll({
      where: {
        category: journalCat
      }
    })
    .then(dbPost => {
      res.json(dbPost);
    });
});
// };

module.exports = router;
