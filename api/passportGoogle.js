const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./db/models/users");

function initialize(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "309880664826-p89k88cli2h9i0il7qh5ogi0gi6e36hu.apps.googleusercontent.com",
        clientSecret: "W4T19tIwmQcFFroS0_LJGzOC",
        callbackURL: "/api/auth/google/redirect"
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({ googleId: profile.id }).then(currentUser => {
          if (currentUser) {
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else {
            //if not, create a new user
            new User({
              googleId: profile.id,
              provider: "google",
              username: profile.displayName
            })
              .save()
              .then(newUser => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });
}

module.exports = initialize;
