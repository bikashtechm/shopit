const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, `Please Enter Name`],
    maxLength: [30, `Name cannot exceed 30 characters`],
  },
  email: {
    type: String,
    require: [true, `Please Enter Email`],
    unique: true,
    validate: [validator.isEmail, `Please Enter Valid Email`],
  },
  password: {
    type: String,
    require: [true, `Please Enter Password`],
    minLength: [6, `Password Cannot be less than 6 characters`],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role: {
    type: String,
    default: `user`,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
