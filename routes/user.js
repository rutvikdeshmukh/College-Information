const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { authentication } = require("../middleware");
const user = require("../controllers/user");

router
  .route("/register")
  .get(catchAsync(user.user_registration))
  .post(catchAsync(user.post_registration));

router
  .route("/login")
  .get(catchAsync(user.user_login))
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.post_login
  );

router.get("/logout", user.user_logout);
module.exports = router;
