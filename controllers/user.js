const userModel = require("../model/user");
module.exports.user_registration = async (req, res) => {
  res.render("user/register.ejs");
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
      req.flash("success", "successfully created the account");
      res.redirect("/college");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.user_login = async (req, res) => {
  res.render("user/login.ejs");
};

module.exports.post_login = (req, res) => {
  req.flash("success", "welcome back");
  const returnUrl = req.session.ReturnTo || "/college";
  delete req.session.ReturnTo;
  res.redirect(returnUrl);
};
module.exports.user_logout = (req, res) => {
  req.logOut();
  req.flash("success", "successfully logout");
  res.redirect("/college");
};
