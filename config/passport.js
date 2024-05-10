const passport = require("passport");
const bcrypt = require("bcryptjs");
const Member = require("../models/member");
const LocalStrategy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");

passport.use(
  new LocalStrategy(
    asyncHandler(async (username, password, done) => {
      const member = await Member.findOne({ username: username });
      const passwordMatch = bcrypt.compare(password, member.password);
      if (!member || !passwordMatch) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, member);
    }),
  ),
);

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const member = await Member.findById(id);
    done(null, member);
  } catch (err) {
    done(err);
  }
});
