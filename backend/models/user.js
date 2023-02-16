const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    minlength: [6, `Password Cannot be less than 6 characters`],
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

// Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESTIME,
  });
};

module.exports = mongoose.model("User", userSchema);
