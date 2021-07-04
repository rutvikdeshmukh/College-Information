const catchAsync = function (fn) {
  return async function (req, res, next) {
    fn(req, res, next).catch((e) => {
      return next(e);
    });
  };
};

module.exports = catchAsync;
