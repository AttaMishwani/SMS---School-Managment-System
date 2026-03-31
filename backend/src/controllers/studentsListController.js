const Student = require("../models/student-model");


const studentsList = async (req, res) => {
    try {
        const schoolId = req.user.schoolId;
        console.log("schoolId from token:", schoolId); // is this correct?

        // fetch ALL students temporarily, ignore schoolId
        const allStudents = await Student.find({});
        console.log("all students in DB:", allStudents.length);

        const filtered = await Student.find({ schoolId: schoolId });
        console.log("filtered students:", filtered.length);

        res.status(200).json({
            schoolId,
            allStudents: allStudents.length,
            filtered: filtered.length,
            students: filtered
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = studentsList