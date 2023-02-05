const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

//Connecting to Database
connectDatabase();
const app = express();

app.use(express.json());

// Setting up Config file
dotenv.config({ path: "backend/config/config.env" });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
