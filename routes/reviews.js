const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { authentication, reviewValidation } = require("../middleware");
const reviews = require("../controllers/reviews");

router.post(
  "/",
  authentication,
  reviewValidation,
  catchAsync(reviews.post_review)
);
router.delete(
  "/:review_id/delete",
  authentication,
  catchAsync(reviews.delete_review)
);
router.get("/:review_id/edit", authentication, catchAsync(reviews.edit_review));
router.patch(
  "/:review_id/update",
  authentication,
  reviewValidation,
  catchAsync(reviews.update_review)
);
module.exports = router;
