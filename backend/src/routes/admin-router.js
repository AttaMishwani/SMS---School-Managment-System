const express = require("express");
const createNewStudentController = require("../controllers/createNewStudentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/createnewstudent", authMiddleware, createNewStudentController);

module.exports = router;