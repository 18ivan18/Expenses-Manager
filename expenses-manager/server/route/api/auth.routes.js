const express = require("express");
const router = express.Router();
const Session = require("../../models/sessionSchema");
const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

router.post("/signin", (req, res) => {
  // console.log("req body", req.body);
  let { email, password } = req.body;
  if (!email) {
    return res.status(500).json({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!password) {
    return res.status(500).send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }
  email = email.toLowerCase();
  email = email.trim();
  User.find(
    {
      email: email,
    }).then(
    (users) => {
      if (users.length != 1) {
        return res.json({
          success: false,
          message: "Error: Invalid",
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.json({
          success: false,
          message: "Error: wrong password",
        });
      }
      // Otherwise correct user
      const accessToken = jwt.sign({ userID: user._id }, process.env.ACESS_TOKEN_SECRET, {
        expiresIn: 7200
      });
      const userSession = new Session({
        token: accessToken,
      });
      userSession
        .save()
        .then((doc) => {
          return res.json({
            success: true,
            message: "Valid sign in",
            token: accessToken,
            user: user,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({
            success: false,
            message: "Error: server error",
          });
        });
    }
  ).catch(err => {
    console.log("err 2:", err);
        return res.json({
          success: false,
          message: "Error: server error" + err.errmsg,
        });
  });
});

router.get("/verify", (req, res) => {
  // Get the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).json({
      success: false,
      message: "Error: No authentication token sent",
    });
  }
  // Verify the token is one of a kind and it's not deleted.
  Session.find({
    token: token,
    isDeleted: false,
  })
    .then((sessions) => {
      if (sessions.length != 1) {
        return res.json({
          success: false,
          message: "Error: Invalid",
        });
      } else {
        // DO ACTION
        jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          console.log(user);
          User.findById(user.userID).then((userFound) => {
            // console.log(userFound)
            return res.status(200).json({
              success: true,
              message: "Good",
              token: token,
              user: userFound,
            });
          }).catch(err => res.status(500).json({
            success: false,
            message: "No such user",
          }));
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: "Error: Server error",
      });
    });
});

router.get("/logout", (req, res) => {
  // Get the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).json({
      success: false,
      message: "Error: No authentication token sent",
    });
  }
  // Verify the token is one of a kind and it's not deleted.
  Session.findOneAndUpdate(
    {
      token: token,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    { useFindAndModify: false }
  )
    .then((sessions) => {
      return res.json({
        success: true,
        message: "Good",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: "Error: Server error",
      });
    });
});

module.exports = router;
