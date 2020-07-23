const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups",
    required: true,
  },
  state: { type: String, enum: ["Accepted", "Pending", "Declined"] },
});

module.exports = mongoose.model("Invite", inviteSchema);
