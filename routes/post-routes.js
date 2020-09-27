// const express = require("express");

const db = require("../models");

// const router = require("./authenticated-html-routes");
module.exports = function(app) {
  // RETREIVES SINGLE POST BY POST ID

  app.get("/api/checkIn/:id", (req, res) => {
    db.CheckIn.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbCheckIn => {
      res.json(dbCheckIn);
    });
  });

  // POSTS CHECKIN

  app.post("/api/checkIn", (req, res) => {
    console.log(req.body);
    db.CheckIn.create({
      authorId: req.body.authorId,
      body: req.body.body,
      feeling: req.body.feeling,
      hiccup: req.body.hiccup
    }).then(dbCheckIn => {
      res.json(dbCheckIn);
    });
  });

  //RETRIEVES ALL POSTS BY SINGLE USER ID

  app.get("/api/checkIns", (req, res) => {
    db.CheckIn.findAll({
      where: {
        authorId: req.body.id
      }
    }).then(dbCheckIn => {
      res.json(dbCheckIn);
    });
  });

  // RETRIEVES ALL HICCUP POSTS

  app.get("/api/hiccups", (req, res) => {
    db.CheckIn.findAll({
      where: {
        hiccup: req.body.hiccup
      }
    }).then(dbCheckIn => {
      res.json(dbCheckIn);
    });
  });
};
