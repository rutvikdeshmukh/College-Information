const ExpressError = require("./ExpressError");
const RegChecking = function (body) {
  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  var collegeProfile = body.student.collegeProfile;
  if (!collegeProfile.match(regex)) {
    throw new ExpressError("Enter the Valid College image Url ", 401);
  }
};
module.exports = RegChecking;
