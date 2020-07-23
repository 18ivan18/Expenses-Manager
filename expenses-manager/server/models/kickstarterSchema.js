const mongoose = require("mongoose");

const kickstarterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required:true },
  name: { type: String, maxlength: 80 },
  endDate: { type: Date, required: true },
  picture: { type: String },
  shortDescription: { type: String, maxlength: 256 },
  detailedDescription: { type: String, maxlength: 2048 },
  goal: { type: Number, required: true },
  validity: { type: String, default: "Active", enum: ["Active", "Expired", "Unactive"] },
});
module.exports = mongoose.model("kickstarter", kickstarterSchema);
