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
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken:',accessToken);
      // console.log('refreshToken:',refreshToken);
      const existingUser = await User.findOne({ googleID: profile.id });
        if (existingUser) {
          //we allready have record of the existinguser
          return done(null, existingUser);
        } 
          //we don't have a user record with this ID, make a new record
            const user = await new User({googleID: profile.id, googleName: profile.displayName }).save();
            done(null,user);

        console.log("profile:", profile.displayName);
    }
  )
);
