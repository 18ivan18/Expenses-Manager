const express = require("express");
// const MongoClient = require('mongodb').MongoClient;
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./route/api/user.routes"));
app.use("/api/account", require("./route/api/auth.routes"));

app.listen(port, () =>
  console.log(`Expensese manager api listening at http://localhost:${port}`)
);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err.error || err || {},
  });
});
