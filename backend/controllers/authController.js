const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middlewares/catchAsyncErrors");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a user  ==> /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Avatar/Bikash_Photo_ikuuhj",
      url: "https://res.cloudinary.com/drern9klr/image/upload/v1676541167/shopit/Avatar/Bikash_Photo_ikuuhj.jpg",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});

// Login User ==> /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is entered by User
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Finding user in Database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password Entered", 401));
  }

  // Check if Password is correct or Not
  const isPasswordMatched = await User.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password Entered", 401));
  }

  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    token,
  });
});
