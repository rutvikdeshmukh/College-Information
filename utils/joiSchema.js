const { number } = require("joi");
const Joi = require("joi");
const collegeSchema = Joi.object({
  student: Joi.object({
    college: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});
module.exports.collegeSchema = collegeSchema;
module.exports.reviewSchema = reviewSchema;
