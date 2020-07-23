const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default:
      "https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg",
  },
  gender: { type: String, enum: ["M", "F"], default: "M" },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  description: { type: String, default:"", maxLength: 512 },
  validity: { type: String, default: "active", enum: ["active", "suspended", "deactivated"] },
  registerDate: { type: Date, default: Date.now() },
  modificationDate: { type: Date, default: Date.now() },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
