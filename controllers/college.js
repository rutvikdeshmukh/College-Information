const ExpressError = require("../utils/ExpressError");
const { collegeModel } = require("../model/college");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
module.exports.index = async (req, res, next) => {
  const findData = await collegeModel.find({});
  return res.render("student/index.ejs", { findData });
};
module.exports.new_college = async (req, res, next) => {
  return res.render("student/new.ejs");
};
module.exports.show_college = async (req, res, next) => {
  const oneRecord = await collegeModel
    .findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  return res.render("student/show.ejs", { oneRecord });
};
module.exports.create_college = async (req, res, next) => {
  const geodata = await geocoder
    .forwardGeocode({
      query: req.body.student.location,
      limit: 1,
    })
    .send();
  const newRecord = new collegeModel(req.body.student);
  newRecord.image = req.files.map((element) => ({
    path: element.path,
    filename: element.filename,
  }));
  newRecord.geometry = geodata.body.features[0].geometry;
  newRecord.author = req.user;
  const record = await newRecord.save();
  req.flash("success", "College Information Added Successfully");
  return res.redirect(`/college/${record._id}`);
};
module.exports.edit_college = async (req, res, next) => {
  const record = await collegeModel.findById(req.params.id);
  return res.render("student/editForm.ejs", { record });
};
module.exports.update_college = async (req, res, next) => {
  const { id } = req.params;
  const record = await collegeModel.findByIdAndUpdate(id, req.body.student);
  const geodata = await geocoder
    .forwardGeocode({
      query: req.body.student.location,
      limit: 1,
    })
    .send();
  record.geometry = geodata.body.features[0].geometry;
  if (req.files.length) {
    const image = req.files.map((element) => ({
      path: element.path,
      filename: element.filename,
    }));
    record.image.push(...image);
  }
  await record.save();
  console.log(req.body.deleteImages);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      cloudinary.uploader.destroy(filename);
    }

    const data = await collegeModel.updateOne({
      $pull: { image: { filename: { $in: req.body.deleteImages } } },
    });
  }

  req.flash("success", "Information Updated Successfully");
  return res.redirect(`/college/${id}`);
};
module.exports.delete_college = async (req, res, next) => {
  await collegeModel.findByIdAndDelete(req.params.id);
  req.flash("error", "College Information Deleted successfully");
  return res.redirect("/college");
};
