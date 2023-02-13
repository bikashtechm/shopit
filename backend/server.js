const app = require("./app");
var http = require("http");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up Config file
dotenv.config({ path: "backend/config/config.env" });

//Connecting to Database
connectDatabase();

var server = http.createServer(function (req, res) {
  res.end("test");
});

server.on("listening", function () {
  console.log("ok, server is running");
});

server.listen(80);
