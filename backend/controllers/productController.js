const Product = require("../models/product.js");

// Create New Product ==>  /api/v1/product/new

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    sucess: true,
    product,
  });
};

// Get All Products ==> /\api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    message: products,
  });
};
