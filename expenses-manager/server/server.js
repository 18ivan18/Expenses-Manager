const express = require("express");
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
app.use("/api/balanceChanges", require("./route/api/balance.changes.routes"));
app.use("/api/groups", require("./route/api/group.routes"));
app.use("/api/invites", require("./route/api/invites.routes"));
app.use("/api/kickstarters", require("./route/api/kickstarter.routes"));



app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
// development error handler
// will print stacktrace
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err.error || err || {},
    success: false
  });
});


app.listen(port, () =>
console.log(`Expensese manager api listening at http://localhost:${port}`)
);