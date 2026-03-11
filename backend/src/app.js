const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-router");
const schoolRouter = require("./routes/schoolRouter");
const adminRouter = require("./routes/admin-router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/schools", schoolRouter);
app.use("/api/admindashboard", adminRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

module.exports = app;