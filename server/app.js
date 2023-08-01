const express = require("express");
const app = express();
const port = 9000;
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./.env" });
const db = require("./config/db");

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("Works");
});

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use("/home", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server Runs on Port ${port}`);
});
