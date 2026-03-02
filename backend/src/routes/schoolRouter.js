const express  = require("express");
const router  = express.Router();
const { pendingSchools, updateSchoolStatus } = require("../controllers/school-controller");
router.get("/pendingschools", pendingSchools);
router.put("/:id/:status", updateSchoolStatus);

module.exports = router;