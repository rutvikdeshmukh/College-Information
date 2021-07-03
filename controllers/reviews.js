const { reviewModel } = require("../model/review");
const { collegeModel } = require("../model/college");

module.exports.post_review = async (req, res, next) => {
  const { id } = req.params;
  const reviewRecord = new reviewModel(req.body.review);
  reviewRecord.author = req.user;
  const studentRecord = await collegeModel.findById(id);
  studentRecord.reviews.push(reviewRecord);
  await reviewRecord.save();
  await studentRecord.save();
  res.redirect(`/college/${id}`);
};
module.exports.delete_review = async (req, res, next) => {
  const { id, review_id } = req.params;
  await reviewModel.findByIdAndDelete(review_id);
  await collegeModel.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
  res.redirect(`/college/${id}`);
};
module.exports.edit_review = async (req, res, next) => {
  const { id, review_id } = req.params;
  const reviewRecord = await reviewModel.findById(review_id);
  res.render("student/editReview.ejs", { reviewRecord, id, review_id });
};
module.exports.update_review = async (req, res, next) => {
  const { id, review_id } = req.params;
  await reviewModel.findByIdAndUpdate(review_id, req.body.review);
  res.redirect(`/college/${id}`);
};
