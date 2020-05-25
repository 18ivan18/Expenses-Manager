const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  expire_at: {
    type: Date,
    default: Date.now,
    expires: 7200,
  },
  token: { type: String, required: true },
});
module.exports = mongoose.model("userSession", userSessionSchema);
