const express = require("express");
const router = express.Router();
const Group = require("../../models/groupSchema");
const User = require("../../models/userSchema");
const BalanceChange = require("../../models/balanceChangeSchema");
const verifyToken = require("../../util/verify-token");
const error = require("../../util/utils").error;
const mongoose = require("mongoose");

const localhostURL = "http://localhost:8080/api/groups/";

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await Group.findById(id);
    if (resp) {
      return res.status(200).json(resp);
    }
    error(req, res, 404, "Group with that id is not found");
  } catch (err) {
    error(req, res, 500, "Error while retrieving groups", err);
  }
});

router.get("/byUser/:userid", verifyToken, async (req, res) => {
  const { userid } = req.params;
  const result = [];
  try {
    const groups = await Group.find({ participents: userid });
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      for (let index = 0; index < group.participents.length; index++) {
        const id = group.participents[index];
        const user = await User.findById(id);
        group.participents[index] = user;
      }
      const payments = await BalanceChange.find({category: group.name});
      result.push(groups[index]);
      result[index] = {...result[index]._doc, payments}
    }
    if (groups) {
      return res.status(200).json(result);
    }
    error(req, res, 404, "Group with that user id is not found");
  } catch (err) {
    error(req, res, 500, "Error while retrieving groups", err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const resp = await Group.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      runValidators: true,
    });
    if (resp) {
      return res.status(200).json(resp);
    }
    error(req, res, 500, "Nothing was modified");
  } catch (err) {
    error(req, res, 500, "Error while updating groups", err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const group = new Group(req.body);
  try {
    const result = await group.save();
    res.status(201).location(`${localhostURL}${group._id}`).json({
      success: true,
      message: "Greated new group",
      result: result,
    });
  } catch (err) {
    error(
      req,
      res,
      500,
      `Error while creating group: ${err.errors.description.properties.message}`,
      err
    );
  }
});

module.exports = router;
