const router = require("express").Router();
// Here we've add our isAuthenticated middleware to this route.
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const nodemailer = require("nodemailer");

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

router.get("/info", isAuthenticated, (req, res) => {
  res.render("info");
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

router.post("/email", isAuthenticated, async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: helena.trantow9@ethereal.email, // generated ethereal user
      pass: FVQb6pmzHxAkB5j7zC // generated ethereal password
    }
  });

  const message = {
    from: "user@ascent.com", // sender address
    to: "helena.trantow9@ethereal.email", // list of receivers
    subject: "New Quote", // Subject line
    text: "A new quote has been added to the API.", // plain text body
    html: "<i>A new quote has been added to the API.</i>" // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(message);
  // console.log(res);
  console.log("Message sent: %s", info.messageId);

  res.send("Email Sent!");
});

module.exports = router;
