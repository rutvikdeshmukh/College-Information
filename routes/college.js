const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { authentication, validation } = require("../middleware");
const { checkAuthor } = require("../middleware");
const college = require("../controllers/college");
var multer = require("multer");
const { storage } = require("../cloudinary");
var upload = multer({ storage });
router.get("/", catchAsync(college.index));
router
  .route("/new")
  .get(catchAsync(college.new_college))
  .post(
    authentication,
    upload.array("image"),
    catchAsync(college.create_college)
  );

router.get("/:id", catchAsync(college.show_college));

router.get(
  "/:id/edit",
  authentication,
  checkAuthor,
  catchAsync(college.edit_college)
);
router.patch(
  "/:id/update",
  authentication,
  checkAuthor,
  upload.array("image"),
  catchAsync(college.update_college)
);
router.delete(
  "/:id/delete",
  authentication,
  checkAuthor,
  catchAsync(college.delete_college)
);
module.exports = router;
