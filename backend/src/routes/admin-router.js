const express = require("express");
const createNewStudentController = require("../controllers/createNewStudentController");
const authMiddleware = require("../middlewares/authMiddleware");
const studentsList = require("../controllers/studentsListController");

const router = express.Router();

router.post("/createnewstudent", authMiddleware, createNewStudentController);
router.get("/studentsList", authMiddleware, studentsList);

module.exports = router;