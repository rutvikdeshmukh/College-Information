const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { authentication, reviewValidation } = require("../middleware");
const reviews = require("../controllers/reviews");
const { checkReviewAuthor } = require("../middleware");
const college = require("../controllers/college");

router
  .route("/")
  .get(catchAsync(college.show_college))
  .post(authentication, reviewValidation, catchAsync(reviews.post_review));
router.delete(
  "/:review_id/delete",
  authentication,
  checkReviewAuthor,
  catchAsync(reviews.delete_review)
);
router.get(
  "/:review_id/edit",
  authentication,
  checkReviewAuthor,
  catchAsync(reviews.edit_review)
);
router.patch(
  "/:review_id/update",
  authentication,
  checkReviewAuthor,
  reviewValidation,
  catchAsync(reviews.update_review)
);
module.exports = router;
