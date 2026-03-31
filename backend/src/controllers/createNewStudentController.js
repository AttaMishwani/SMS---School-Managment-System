const Student = require("../models/student-model");

const createNewStudentController = async (req, res) => {
  console.log("createNewStudentController hit", req.body);

  try {
    const schoolId = req.user?.schoolId;
    const userId = req.user?._id;
    const role = req.user?.role;

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

    // accept a few common alternative field names coming from the frontend
    const normalizedStudentName = studentName || req.body.student_name || req.body.name;
    const normalizedFatherName = fatherName || req.body.father_name || req.body.parentName;
    const normalizedRollNumber = rollNumber || req.body.roll_no || req.body.rollnumber;
    const normalizedClassName = className || req.body.class || req.body.class_name;
    const normalizedMonthlyFee = monthlyFee ?? req.body.monthly_fee ?? req.body.fee;
    const phoneString = phone ? String(phone).trim() : "";

    // quick guard: we need to know which fields are missing
    const requiredFields = {
      studentName: normalizedStudentName,
      fatherName: normalizedFatherName,
      rollNumber: normalizedRollNumber,
      className: normalizedClassName,
      monthlyFee: normalizedMonthlyFee,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => value === undefined || value === null || value === "")
      .map(([key]) => key);

    if (!schoolId) {
      return res.status(400).json({
        success: false,
        message: "No school assigned to current user",
      });
    }

    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Required fields missing: ${missingFields.join(", ")}`,
      });
    }

    // normalize numeric fields
    const monthlyFeeNumber = Number(normalizedMonthlyFee);

    // Step 2: fee validation
    if (Number.isNaN(monthlyFeeNumber) || monthlyFeeNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly fee must be a valid number greater than 0",
      });
    }

    // Step 3: phone validation (basic)
    if (phoneString && phoneString.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // Step 4: check duplicate roll number in same school
    const existingStudent = await Student.findOne({
      schoolId,
      rollNumber: normalizedRollNumber,
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Roll number already exists for this school",
      });
    }

    const newStudent = await Student.create({
      schoolId,
      userId,
      role,
      studentName: normalizedStudentName,
      fatherName: normalizedFatherName,
      address,
      phone: phoneString || undefined,
      monthlyFee: monthlyFeeNumber,
      section,
      className: normalizedClassName,
      admissionDate: admissionDate ? new Date(admissionDate) : undefined,
      rollNumber: normalizedRollNumber,
      gender,
      dob: dob ? new Date(dob) : undefined,
    });

    return res.status(201).json({
      message: "New student created successfully",
      student: newStudent,
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = createNewStudentController;
