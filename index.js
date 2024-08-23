const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const questions = require("./routes/questions");
require("dotenv").config();

const app = express();

connectDB();

app.use(bodyParser.json());

app.use("/questions", questions);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
