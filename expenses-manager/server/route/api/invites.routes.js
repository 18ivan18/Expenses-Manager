const express = require("express");
const router = express.Router();
const Invite = require("../../models/inviteSchema");
const verifyToken = require("../../util/verify-token");
const error = require("../../util/utils").error;
const mongoose = require("mongoose");

router.post("/", verifyToken, async (req, res) => {
  const { groupId, userId } = req.body;
  const invite = new Invite({
    _id: new mongoose.Types.ObjectId(),
    from: req.userID,
    to: userId,
    group: groupId,
    state: "Pending",
  });
  try {
    const result = await invite.save();
    return res.status(201).json({result, success: true, message: "User successfully invited."});
  } catch (err) {
    console.log(err);
    error(req, res, 500, "Error while inviting", err);
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Invite.find({ to: userId, state:'Pending' });
    if (result) {
      return res.status(201).json(result);
    }
    error(req, res, 500, "Nothing was found");
  } catch (err) {
    console.log(err);
    error(req, res, 500, "Error while inviting", err);
  }
});

router.put("/:inviteId", verifyToken, async (req, res) => {
  const { inviteId } = req.params;
  try {
    const resp = await Invite.findByIdAndUpdate(inviteId, req.body, {
      useFindAndModify: false,
      runValidators: true,
      new: true
    });
    if (resp) {
      return res.status(200).json(resp);
    }
    error(req, res, 500, "Nothing was modified");
  } catch (err) {
    error(req, res, 500, "Error while updating invites", err);
  }
});
module.exports = router;
