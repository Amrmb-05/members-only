const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", member: req.user });
});

// Sign-up page routes
router.get("/sign-up", signUpController.createMember_get);
router.post("/sign-up", signUpController.createMember_post);

// Login page routes
router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);

// Log out route
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
