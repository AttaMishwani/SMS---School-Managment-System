const Student = require("../models/student-model");

const createNewStudentController = async (req, res) => {
  console.log("controller hit");
try {
    const schoolId = req.user.schoolId;
    const userId = req.user._id;
    const role = req.user.role;
  
    const {
      studentName,
      fatherName,
      address,
      phone,
      monthlyFee,
      section,
      className,
      admissionDate,
      rollNumber,
      gender,
      dob,
    } = req.body;

    // normalize numeric fields
    const monthlyFeeNumber = Number(monthlyFee);

    // Step 1: required field validation
     if (!studentName || !fatherName || !rollNumber || !className || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }
  
    // Step 2: fee validation
    if (Number.isNaN(monthlyFeeNumber) || monthlyFeeNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly fee must be a valid number"
      });
    }
  
    // Step 3: phone validation (basic)
    if (phone && phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }
  
    // Step 4: check duplicate roll number in same school
    const existingStudent = await Student.findOne({
      schoolId,
      rollNumber
    });
  
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Roll number already exists for this school"
      });
    }
  
  
    const newStudent = await Student.create({
      schoolId,
      userId,
      role,
      studentName,
      fatherName,
      address,
      phone,
      monthlyFee: monthlyFeeNumber,
      section,
      className,
      admissionDate,
      rollNumber,
      gender,
      dob,
    })
  
    
      return res.status(201).json({
          message :"new student created successfully",
          student : newStudent,
          success:true
      })
   
   
  

} catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
}
 
};

module.exports = createNewStudentController;
