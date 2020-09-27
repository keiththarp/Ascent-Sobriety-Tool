const router = require("express").Router();

// const isAuthenticated = require("../config/middleware/isAuthenticated");
// router.use("/", isAuthenticated);

const db = require("../models");

// get method to retrieve past journal entries in the server
router.get("/checkIn", (req, res) => {
  console.log("made it here!");
  if (!req.user) {
    res.json({});
  } else {
    // turned result to string just for testing
    res.json({ id: "result" });
  }
});

router.post("/checkIn", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({ id: result });
  }
});

// RETRIEVES SINGLE POST BY POST ID

router.get("/checkIn/:id", (req, res) => {
  db.checkIn.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbcheckIn => {
    res.json(dbcheckIn);
  });
});

//RETRIEVES ALL POSTS BY SINGLE USER ID

// actual endpoint = /api/post/all or changed to checkIn /api/check-in/all
//*** used to be /posts */
router.get("/checkIns", (req, res) => {
  db.checkIn.findAll({
    where: {
      authorId: req.body.id
    }
  }).then(dbcheckIn => {
    res.json(dbcheckIn);
  });
});

// *** just saving to see
// app.get("/api/checkIns", (req, res) => {
//   db.CheckIn.findAll({
//     where: {
//       authorId: req.body.id
//     }
//   }).then(dbCheckIn => {
//     res.json(dbCheckIn);
//   });
// });

// RETRIEVES ALL HICCUP POSTS

router.get("/hiccups", (req, res) => {
  db.CheckIn.findAll({
    where: {
      hiccup: req.body.hiccup
    }
  }).then(dbCheckIn => {
    res.json(dbCheckIn);
  });
});

module.exports = router;
