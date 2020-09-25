// const express = require("express");
const router = require("authenticated-html-routes");

// get method to retrieve past journal entrise in the server
router.get("/api/post", (req, res) => {
  try {
    console.log(req.body);
    // need to know what we're getting where
    res.render("post", console.log(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// post method to send journal entry to the servers
router.post("/api/post", (req, res) => {
  const placeHolderConst = "placeholder";
  try {
    console.log(req.body);
    // need to know what we're logging where
    res.json("index", placeHolderConst);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
