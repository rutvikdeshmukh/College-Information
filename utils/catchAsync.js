const catchAsync = function (fn) {
  return async function (req, res, next) {
    try {
      fn(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

module.exports = catchAsync;
