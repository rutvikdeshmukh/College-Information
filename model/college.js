const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { reviewModel } = require("./review");
const userModel = require("./user");
const opts = { toJSON: { virtuals: true } };
const imageSchema = new schema({
  path: String,
  filename: String,
});
imageSchema.virtual("thumbnail").get(function () {
  return this.path.replace("/upload", "/upload/w_200");
});

const collegeSchema = new schema(
  {
    college: {
      type: String,
      required: [true, "college is required"],
    },
    image: [imageSchema],

    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    author: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);
collegeSchema.virtual("properties.popupText").get(function () {
  return `<strong> <a href="/student/${this._id}"> ${this.college} </a> </strong>
   <p> ${this.description}</p>`;
});

collegeSchema.post("findOneAndDelete", async (data) => {
  if (data.reviews.length) {
    const records = await reviewModel.deleteMany({
      _id: { $in: data.reviews },
    });
  }
});

const collegeModel = mongoose.model("College", collegeSchema);
module.exports.collegeModel = collegeModel;
