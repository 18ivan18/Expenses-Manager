const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
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
    expires: 7200 },
});
module.exports = mongoose.model("userSession", userSessionSchema);
