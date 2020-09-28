const db = require("../models");

// const isAuthenticated = require("../config/middleware/isAuthenticated");
// router.use("/", isAuthenticated);

module.exports = function(app) {
  // get method to retrieve past journal entries in the server
  app.get("/api/check-in/:id", (req, res) => {
    thisId = req.params.id;
    db.CheckIn.findAll({
      where: {
        authorId: thisId
      }
    }).then(checkIn => {
      res.json(checkIn);
    });
  });

  // Posting a check-in
  app.post("/api/check-in", (req, res) => {
    db.CheckIn.create({
      authorId: req.body.authorId,
      body: req.body.body,
      feeling: req.body.feeling,
      hiccup: req.body.hiccup
    })
      .then(() => {
        res.json({});
        // res.redirect(307, "/counter");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // RETRIEVES SINGLE POST BY POST ID

  router.get("/check-in/:id", (req, res) => {
    db.CheckIn.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  //RETRIEVES ALL POSTS BY SINGLE USER ID

  // actual endpoint = /api/check-in/all or changed to checkIn /api/check-in/all
  router.get("/journal", (req, res) => {
    db.checkIn
      .findAll({
        where: {
          authorId: req.user.id
        }
      })
      .then(dbCheckIn => {
        res.json(dbCheckIn);
      });
  });

  router.get("/hiccup/all", (req, res) => {
    db.CheckIn.findAll({
      where: {
        hiccup: req.body.hiccup
      }
    }).then(dbCheckIn => {
      res.json(dbCheckIn);
    });
  });
};
