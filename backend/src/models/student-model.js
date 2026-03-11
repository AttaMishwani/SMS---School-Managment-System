const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    studentName: {
      type: String,
      required: true
    },

    fatherName: {
      type: String,
      required: true
    },

    rollNumber: {
      type: String,
      required: true
    },

    className: {
      type: String,
      required: true
    },

    section: String,

    monthlyFee: {
      type: Number,
      required: true
    },

    phone: String,

    address: String,

    admissionDate: Date,

    dob: Date,

    gender: String
  },
  { timestamps: true }
);

studentSchema.index(
  { schoolId: 1, rollNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Student", studentSchema);