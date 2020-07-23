const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  participents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  // payments: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "balanceChange", default: [] },
  // ],
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  }
});
module.exports = mongoose.model("Groups", groupSchema);
