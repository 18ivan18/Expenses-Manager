const dotenv = require("dotenv");
const User = require("../models/userSchema");
dotenv.config();

const verifyRole = (role) => {
  return (req, res, next) => {
    const userId = req.userID;
    if (!userId) {
      next({ status: 403, message: "No user id provided." });
    } else {
      User.findById(userId)
        .then((user) => {
          if (user.role === role || user.role === "admin") {
            delete user.password;
            req.user = user;
            next();
          } else {
            next({
              status: 403,
              message: "Not enough privilegies to do this.",
            });
          }
        })
        .catch((err) => next({ status: 500, message: "Server error.", err }));
    }
  };
};

module.exports = verifyRole;
