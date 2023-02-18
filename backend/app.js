const express = require("express");
const path = require("path");

const app = express();

const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

// Imports All Routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
