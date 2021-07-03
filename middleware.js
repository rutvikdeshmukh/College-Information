const { reviewSchema, collegeSchema } = require("./utils/joiSchema");
const ExpressError = require("./utils/ExpressError");
const RegChecking = require("./utils/regularExpression");
const { collegeModel } = require("./model/college");
const { reviewModel } = require("./model/review");
const authentication = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.ReturnTo = req.originalUrl;
    req.flash("error", "You must be Login User");
    return res.redirect("/login");
  }
  return next();
};

const validation = function (req, res, next) {
  const result = collegeSchema.validate(req.body);
  if (result.error) {
    const message = result.error.details
      .map((ele) => {
        return ele.message;
      })
      .join(",");
    throw new ExpressError(message, 404);
  }

  RegChecking(req.body);
  return next();
};

const reviewValidation = function (req, res, next) {
  const result = reviewSchema.validate(req.body);
  if (result.error) {
    const message = result.error.details
      .map((ele) => {
        return ele.message;
      })
      .join(",");
    throw new ExpressError(message, 404);
  }
  return next();
};

const checkAuthor = async function (req, res, next) {
  const { id } = req.params;
  const data_record = await collegeModel.findById(id);
  if (!data_record.author.equals(req.user._id)) {
    req.flash("error", "you dont have permission ");
    return res.redirect(`/student/${id}`);
  }
  return next();
};
const checkReviewAuthor = async function (req, res, next) {
  const { id, review_id } = req.params;
  const data_record = await reviewModel.findById(review_id).populate("author");
  if (!data_record.author.equals(req.user)) {
    req.flash("error", "you dont have permission ");
    return res.redirect(`/student/${id}`);
  }
  return next();
};
module.exports.authentication = authentication;
module.exports.reviewValidation = reviewValidation;
module.exports.validation = validation;
module.exports.checkAuthor = checkAuthor;
module.exports.checkReviewAuthor = checkReviewAuthor;
