const mongoose = require("mongoose");

const balanceChangeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["income", "payment"],
  },
  category: {
    type: String,
    required: true,
  },
  categoryPicture: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("balanceChange", balanceChangeSchema);
