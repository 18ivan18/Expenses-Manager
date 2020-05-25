const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const Session = require("../../models/sessionSchema");
const mongoose = require("mongoose");
const validator = require("email-validator");
const verifyToken = require('../../util/verify-token');
const verifyRole = require('../../util/verify-role');

const emailValid = (email) => validator.validate(email);

const passwordValid = (password) =>
  password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  );

router.get("/", verifyToken, verifyRole("admin"), (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({ users, success: true, message: "Good" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.errmsg,
      });
    });
});

router.get("/:id", verifyToken, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          user,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "User not found.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    });
});

router.delete("/:id", verifyToken, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({ user, success: true, message: "Deleted successfully" });
      } else {
        res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

router.patch("/:id", verifyToken, (req, res) => {
  const user = new User();
  if (req.body.password) {
    req.body.password = user.generateHash(req.body.password);
  }
  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((user) => {
      if (user) {
        res
          .status(200)
          .json({ user, success: true, message: "Successfully updated user" });
      } else {
        res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

router.post("/", (req, res) => {
  //   console.log("req body", req.body);
  if (!emailValid(req.body.email)) {
    return res.status(500).json({
      success: false,
      message: "Invalid email.",
      result: null,
    });
  }
  if (!passwordValid(req.body.password)) {
    return res.status(500).json({
      success: false,
      message:
        "Password must be between 8 and 15 characters and contain small letter, capital letter, number and special sign.",
      result: null,
    });
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
  });
  user.password = user.generateHash(req.body.password);
  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Signed up",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.errmsg || err.message,
        result: null,
      });
    });
});

module.exports = router;
