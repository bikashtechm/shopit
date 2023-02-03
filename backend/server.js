const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up Config file
dotenv.config({ path: "backend/config/config.env" });

//Connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle "Unhandled Promise Rejection" error
process.on("unhandledRejection", (err) => {
  console.log(`ERRORS: ${err.message}`);
  console.log(`SHutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
