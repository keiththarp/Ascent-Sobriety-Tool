const db = require("../models");

// const isAuthenticated = require("../config/middleware/isAuthenticated");
// router.use("/", isAuthenticated);

module.exports = function (app) {
  // get method to retrieve past journal entries in the server
  app.get("/api/check-in", (req, res) => {
    console.log("made it here!");
    if (!req.user) {
      res.json({});
    } else {
      // turned result to string just for testing
      res.json({ id: "result" });
    }
  });

  // Posting a check-in
  app.post("/api/check-in", (req, res) => {
    console.log(req.body);
    db.CheckIn.create({
      authorId: req.body.authorId,
      body: req.body.body,
      feeling: req.body.feeling,
      hiccup: req.body.hiccup
    })
      .then(() => {
        res.json({});
        res.redirect(307, "/journal");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
};

/*
router.post("/check-in", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({ id: result });
  }
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
router.get("/check-in/all", (req, res) => {
  db.CheckIn.findAll({
    where: {
      authorId: req.body.id
    }
  }).then(dbCheckIn => {
    res.json(dbCheckIn);
  });
});

// POSTS CHECKIN

// app.post("/api/check-in", (req, res) => {
//   if (!req.user) {
//     res.json({});
//   } else {
//     res.json({ id: result });
//   }
// });

//RETRIEVES ALL POSTS BY SINGLE USER ID

// RETRIEVES ALL HICCUP POSTS

// router.get("/hiccups", (req, res) => {
//   db.Post.findAll({
//     where:
//   })
// })

router.get("/hiccup/all", (req, res) => {
  db.CheckIn.findAll({
    where: {
      hiccup: req.body.hiccup
    }
  }).then(dbCheckIn => {
    res.json(dbCheckIn);
  });
});
*/
