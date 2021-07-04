const userModel = require("../model/user");
module.exports.user_registration = async (req, res) => {
  return res.render("user/register.ejs");
};
module.exports.post_registration = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new userModel({ username: username, email: email });
    const newUser = await userModel.register(user, password);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Account Created Successfully");
      return res.redirect("/college");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/register");
  }
};

module.exports.user_login = async (req, res, next) => {
  return res.render("user/login.ejs");
};

module.exports.post_login = async (req, res, next) => {
  const returnUrl = req.session.ReturnTo || "/college";
  delete req.session.ReturnTo;
  req.flash("success", "Welcome Back");
  return res.redirect(returnUrl);
  // console.log("this is data");
};
module.exports.user_logout = async (req, res, next) => {
  req.logOut();
  req.flash("success", "Successfully Logout");
  return res.redirect("/college");
};
