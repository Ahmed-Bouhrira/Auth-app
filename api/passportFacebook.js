const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("./db/models/users");

function initialize(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "983039932182983",
        clientSecret: "a401e79059a960c24ce45d7897c5d6d3",
        callbackURL: "/api/auth/facebook/redirect"
      },
      function(accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile._json;
        new User({
          email,
          firstName: first_name,
          lastName: last_name
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
}

module.exports = initialize;
