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

// Get Single Product Details ==> /'api/vi/product:id

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};
