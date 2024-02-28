const express = require("express");
const comments = require("./data/comments");
const threads = require("./data/threads");
const users = require("./data/users");
const bodyParser = require("body-parser");
const consoleLogger = require("./middleware/consoleLogger");

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE-------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// app.use(consoleLogger);

//ROUTES-----------------------------------------------------------
const userRouter = require("./routes/users");
app.use("/users", userRouter);

const threadsRouter = require("./routes/threads");
app.use("/threads", threadsRouter);

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

//GLOBAL ERROR HANDLE----------------------------------------------

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong on our end.");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
