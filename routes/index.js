const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Sign-up page routes
router.get("/sign-up", signUpController.createMember_get);
router.post("/sign-up", signUpController.createMember_post);

// Login page routes
router.get("/login", loginController.login_get);
module.exports = router;
