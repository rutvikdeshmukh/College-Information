const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { authentication } = require("../middleware");
const reviews = require("../controllers/reviews");
const college = require("../controllers/college");

router
  .route("/")
  .get(catchAsync(college.show_college))
  .post(authentication, catchAsync(reviews.post_review));
router.delete("/:review_id/delete", catchAsync(reviews.delete_review));
router.get("/:review_id/edit", catchAsync(reviews.edit_review));
router.patch("/:review_id/update", catchAsync(reviews.update_review));
module.exports = router;
