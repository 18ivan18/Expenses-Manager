const express = require("express");
const router = express.Router();
const Kickstarter = require("../../models/kickstarterSchema");
const BalanceChange = require("../../models/balanceChangeSchema");
const User = require("../../models/userSchema");
const mongoose = require("mongoose");
const verifyToken = require("../../util/verify-token");
const verifyRole = require("../../util/verify-role");
const error = require("../../util/utils").error;

router.get("/", async (req, res) => {
  try {
    const kickstarters = await Kickstarter.find();
    const result = [];
    for (let index = 0; index < kickstarters.length; index++) {
      const incomes = await BalanceChange.find({
        category: kickstarters[index].name,
      });
      result[index] = { ...kickstarters[index]._doc, incomes };
      if (result[index].incomes.length !== 0) {
        result[index].pledged = result[index].incomes
          .map((inc) => inc.amount)
          .reduce((accumulator, currentElem) => accumulator + currentElem);
        result[index].backers = new Set(result[index].incomes.map((inc) => inc.userID)).size;
      } else {
        result[index].pledged = 0;
        result[index].backers = 0;
      }
      const element = kickstarters[index];
      const user = await User.findById(element.authorId);
      user.password = undefined;
      result[index] = { ...kickstarters[index]._doc, author: user, ...result[index] };
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    error(req, res, 500, "Error getting all kickstarters", err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const kickstarter = await Kickstarter.findById(id);
    if (kickstarter) {
      const incomes = await BalanceChange.find({ category: kickstarter.name });
      const result = { ...kickstarter._doc, incomes };
      if (result.incomes.length !== 0) {
        result.pledged = result.incomes
          .map((inc) => inc.amount)
          .reduce((accumulator, currentElem) => accumulator + currentElem);
        result.backers = new Set(result.incomes.map((inc) => inc.userID)).size;
      } else {
        result.pledged = 0;
        result.backers = 0;
      }
      const user = await User.findById(result.authorId);
      user.password = undefined;
      result.author = user;
      res.status(200).json(result);
    } else {
      error(req, res, 404, "Kickstarter not found", err);
    }
  } catch (err) {
    error(req, res, 500, "Error getting kickstarter by id", err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Kickstarter.findByIdAndDelete(id);
    if (deleted) {
      res
        .status(200)
        .json({ deleted, success: true, message: "Successfully deleted." });
    } else {
      error(req, res, 404, "Kickstarter not found");
    }
  } catch (error) {
    error(req, res, 500, "Error deleting kickstarter by id", err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await Kickstarter.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      runValidators: true,
    });
    if (resp) {
      return res.status(200).json({
        resp,
        message: "Successfully updated kickstarter.",
        success: true,
      });
    }
    error(req, res, 500, "Nothing was modified");
  } catch (err) {
    error(req, res, 500, "Error while updating kickstarter", err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const kickstarter = new Kickstarter({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    authorId: req.userID,
  });
  try {
    const result = await kickstarter.save();
    res.status(201).json({
      result,
      success: true,
      message: "Successfully created new kickstarter",
    });
  } catch (err) {
    error(req, res, 500, "Error creating new kickstarter", err);
  }
});

module.exports = router;
