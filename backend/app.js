const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

const errorMiddleware = require("./middlewares/errors");
app.use(cors());
app.use(express.json());

// Imports All Routes
const products = require("./routes/product");

app.use("/api/v1", products);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
