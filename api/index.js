const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportLocal = require("./passportLocal");
const passportGoogle = require("./passportGoogle");
const passportFacebook = require("./passportFacebook");
const User = require("./db/models/users.js");
const app = express();
const routers = express.Router();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.SERVER,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  { useMongoClient: true }
);
routers.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connection
  .once("open", () => console.log("Connected to the database!"))
  .on("error", err => console.log("Error", err));

routers.use(bodyParser.urlencoded({ extended: false }));
routers.use(bodyParser.json());

routers.use(express.json());
routers.use(express.urlencoded({ extended: false }));
routers.use(cookieParser());

passportLocal(passport, User.getUserByEmail, User.getUserById);
passportGoogle(passport);
passportFacebook(passport);
routers.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false
  })
);

routers.use(passport.initialize());
routers.use(passport.session());
var checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return { username: false };
  }
};
routers.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    let fields = ["_id", "username", "email", "type", "image"];
    let user = fields.reduce((acc, cv) => {
      acc[cv] = req.user[cv];
      return acc;
    }, {});
    return res.send(user);
  } else {
    return res.send({ username: false });
  }
});

routers.post("/login", passport.authenticate("local"), function(req, res) {
  // If this function gets called, authentication was successful.

  res.json({ user: req.user });
});

//////////////////////////////google
routers.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

routers.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);
/////////////////////////////////facebook
routers.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"]
  })
);

routers.get(
  "/auth/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

routers.post("/register", checkNotAuthenticated, async (req, res) => {
  let { username, email, password } = req.body;
  try {
    user = await User.save({ username, email, password });
    passport.authenticate("local")(req, res, function() {
      res.json({ user: req.user });
    });
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});
routers.delete("/logout", (req, res) => {
  req.logOut();

  res.sendStatus(204);
  // res.redirect("/login");
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

routers.get("/images/:img", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", req.params.img));
});

var users = require("./routes/users.js");
routers.use("/users", checkAuthenticated, users);

app.use("/api", routers);
module.exports = app;
