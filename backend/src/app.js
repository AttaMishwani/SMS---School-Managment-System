const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth-router");
const schoolRouter = require("./routes/schoolRouter");
app.use("/api/auth", authRouter);
app.use("/api/schools", schoolRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

module.exports = app;