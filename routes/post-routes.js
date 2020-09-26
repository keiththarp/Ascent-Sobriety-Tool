// const express = require("express");

const db = require("../models");

// const router = require("./authenticated-html-routes");
module.exports = function(app) {
  // get method to retrieve past journal entrise in the server
  app.get("/api/post", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({ id: result });
    }
  });

  // post method to send journal entry to the servers
  // app.post("/api/post", (req, res) => {
  //   const placeHolderConst = "placeholder";
  //   try {
  //     console.log(req.body);
  //     // need to know what we're logging where
  //     res.json("index", placeHolderConst);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json(err);
  //   }
  // });

  app.post("/api/post", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({ id: result });
    }
  });

  // RETREIVES SINGLE POST BY POST ID

  app.get("/api/post/:id", (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  //RETRIEVES ALL POSTS BY SINGLE USER ID

  app.get("/api/posts/", (req, res) => {
    db.Post.findAll({
      where: {
        authorId: req.body.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
