const router = require("express").Router();
const db = require("../models");

// const isAuthenticated = require("../config/middleware/isAuthenticated");
// router.use("/", isAuthenticated);

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
  db.CheckIn.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbCheckIn => {
    res.json(dbCheckIn);
  });
});

//RETRIEVES ALL POSTS BY SINGLE USER ID

// actual endpoint = /api/checkIn/all or changed to checkIn /api/checkIn/all
router.get("/checkIn/all", (req, res) => {
  db.CheckIn.findAll({
    where: {
      authorId: req.body.id
    }
  }).then(dbCheckIn => {
    res.json(dbCheckIn);
  });
});

// POSTS CHECKIN

// app.post("/api/checkIn", (req, res) => {
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

module.exports = router;
