const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.errmsg,
      });
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
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

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ user, success: true });
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

router.patch("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true })
    .then((user) => {
      if (user) {
        res.status(200).json({ user, success: true });
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
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email
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
        message: err.errmsg,
        result: null,
      });
    });
});

module.exports = router;
