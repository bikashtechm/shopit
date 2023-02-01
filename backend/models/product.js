const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot be longer than 100 characters"],
  },
  price: {
    type: Number,
    require: [true, "Please enter product price"],
    maxLength: [5, "Product name cannot be longer than 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    require: [true, "Please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please select product category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
        "Grocery",
        "Garden",
        "Other",
      ],
      message: "Please select correct product category",
    },
  },
  seller: {
    type: String,
    require: [true, "Please enter seller name"],
  },
  stock: {
    type: Number,
    require: [true, "Please enter product stock"],
    maxLength: [5, "Product stock cannot be greater than 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
