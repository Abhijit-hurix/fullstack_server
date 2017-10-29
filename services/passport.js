const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user=>{
    done(null,user);
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken:',accessToken);
      // console.log('refreshToken:',refreshToken);
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //we allready have record of the existinguser
          done(null, existingUser);
        } else {
          //we don't have a user record with this ID, make a new record
          new User({
            googleID: profile.id,
            googleName: profile.displayName
          })
            .save()
            .then(user => done(null, user));
        }
      });
      console.log("profile:", profile.displayName);
    }
  )
);
