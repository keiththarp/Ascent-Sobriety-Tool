//Require environment variables
require("dotenv").config();

// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const authenticatedRoutes = require("./routes/authenticated-html-routes");
const apiRoutes = require("./routes/api-routes");

// const postRoute = require("./routes/post-routes");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// This is the authenticate router we built with Bobby
app.use("/api", apiRoutes);

require("./routes/html-routes.js")(app);

app.use("/", authenticatedRoutes);

// require("./routes/post-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
