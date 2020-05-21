const express = require("express");
const router = express.Router();
const Session = require("../../models/sessionSchema");
const User = require("../../models/userSchema");
const mongoose = require("mongoose");

router.post("/signin", (req, res) => {
  console.log("req body", req.body);
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
    },
    (err, users) => {
      if (err) {
        console.log("err 2:", err);
        return res.json({
          success: false,
          message: "Error: server error",
        });
      }
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
          message: "Error: Invalid",
        });
      }
      // Otherwise correct user
      const userSession = new Session({
        userId: user._id,
      });
      userSession
        .save()
        .then((doc) => {
          return res.json({
            success: true,
            message: "Valid sign in",
            token: doc._id,
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
  );
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
    _id: token,
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
        User.findById(sessions[0].userId).then((user) => {
          return res.status(200).json({
            success: true,
            message: "Good",
            token: sessions[0].userId,
            user: user,
          });
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
  const { token } = req.body;
  // Verify the token is one of a kind and it's not deleted.
  Session.findOneAndUpdate(
    {
      _id: token,
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
      return res.send({
        success: false,
        message: "Error: Server error",
      });
    });
});

module.exports = router;
