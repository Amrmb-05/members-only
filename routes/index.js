const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Sign-up page routes
router.get("/sign-up", signUpController.createMember_get);
module.exports = router;
