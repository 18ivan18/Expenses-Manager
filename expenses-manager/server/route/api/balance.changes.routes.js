const express = require("express");
const router = express.Router();
const BalanceChange = require("../../models//balanceChangeSchema");
const mongoose = require("mongoose");
const verifyToken = require("../../util/verify-token");
const verifyRole = require("../../util/verify-role");

router.post("/", verifyToken, (req, res) => {
  console.log("req body", req.body);
  //authenticate req.body
  new BalanceChange({
    type: req.body.type,
    category: req.body.category,
    amount: req.body.amount,
    userID: req.userID,
  })
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: `New ${req.body.type} created.`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err._message,
        result: null,
      });
    });
});

router.get("/:type/:id", verifyToken, (req, res) => {
  //authenticate req.body
  if (req.params.id !== req.userID) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
      result: null,
    });
  }
  if(!["income", "payment"].includes(req.params.type)) {
    return res.status(403).json({
      success: false,
      message: "URL fault.",
      result: null,
    });
  }
  BalanceChange.find({
    userID: req.userID,
    type: req.params.type
  })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `Found user's ${req.params.type}.`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err._message,
        result: null,
      });
    });
});

module.exports = router;
