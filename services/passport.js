const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/dev");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile.name.givenName);
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          cb(null, existingUser);
        } else {
          new User({
            googleID: profile.id,
            displayName: profile.name.givenName
          })
            .save()
            .then(user => cb(null, user));
        }
      });
    }
  )
);
