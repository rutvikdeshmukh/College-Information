const catchAsync = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => {
      console.log("errors is " + e);
      return next(e);
    });
  };
};

module.exports = catchAsync;
