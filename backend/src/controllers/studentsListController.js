const Student = require("../models/student-model");


const studentsList = async (req, res) => {
    try {
        const schoolId = req.user.schoolId;
        console.log("schoolId from token:", schoolId); 

      
        const allStudents = await Student.find({schoolId: schoolId});
        console.log("all students in DB:", allStudents.length);

      return  res.status(200).json({
            schoolId,
            allStudents: allStudents.length,
            students: allStudents
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = studentsList