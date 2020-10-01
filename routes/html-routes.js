// Requiring our custom middleware for checking if a user is logged in
const router = require("express").Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("start");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.post("/email", async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "helena.trantow9@ethereal.email", // generated ethereal user
      pass: "FVQb6pmzHxAkB5j7zC" // generated ethereal password
    }
  });

  const message = {
    from: "blah@blah.com", // sender address
    to: "helena.trantow9@ethereal.email", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  console.log(`req.data: ${req}`);
  // console.log(res);

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);

  res.send("Email Sent!");
});

module.exports = router;
