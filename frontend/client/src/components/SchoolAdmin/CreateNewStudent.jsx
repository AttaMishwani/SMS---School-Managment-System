import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/Auth";

const URL = "http://localhost:5000/api/adminDashboard/createnewstudent";

export default function CreateNewStudent() {
  const { token, user } = useAuth();
  const [newStudentForm, setNewStudentForm] = useState({
    studentName: "",
    fatherName: "",
    rollNumber: "",
    dob: "",
    gender: "",
    admissionDate: "",
    className: "",
    section: "",
    monthlyFee: "",
    parentName: "",
    phone: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Normalize values before sending to the API so they align with server-side validation.
    const payload = {
      studentName: newStudentForm.studentName.trim(),
      fatherName: newStudentForm.fatherName.trim(),
      // Send both camelCase and snake_case style keys for compatibility with the updated controller.
      rollNumber: newStudentForm.rollNumber.trim(),
      roll_no: newStudentForm.rollNumber.trim(),
      dob: newStudentForm.dob,
      gender: newStudentForm.gender,
      admissionDate: newStudentForm.admissionDate,
      className: newStudentForm.className,
      class: newStudentForm.className,
      section: newStudentForm.section,
      monthlyFee: newStudentForm.monthlyFee ? Number(newStudentForm.monthlyFee) : "",
      monthly_fee: newStudentForm.monthlyFee ? Number(newStudentForm.monthlyFee) : "",
      parentName: newStudentForm.parentName.trim(),
      parent_name: newStudentForm.parentName.trim(),
      phone: newStudentForm.phone.trim(),
      address: newStudentForm.address.trim(),
      // Some deployments require schoolId in the body even though the backend now checks the authenticated user.
      schoolId: user?.schoolId || user?.school_id,
    };

    // Lightweight client-side checks to avoid avoidable 400s.
    if (!payload.studentName || !payload.fatherName || !payload.rollNumber) {
      setErrorMessage("Student name, father name, and roll number are required.");
      return;
    }
    if (!payload.className) {
      setErrorMessage("Class is required.");
      return;
    }
    if (!payload.monthlyFee || payload.monthlyFee <= 0) {
      setErrorMessage("Monthly fee must be greater than 0.");
      return;
    }
    if (payload.phone && payload.phone.replace(/\\D/g, "").length < 10) {
      setErrorMessage("Phone number looks too short.");
      return;
    }

    console.log("Student Form Data (normalized):", payload);

    try {
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setNewStudentForm({
        studentName: "",
        fatherName: "",
        rollNumber: "",
        dob: "",
        gender: "",
        admissionDate: "",
        className: "",
        section: "",
        monthlyFee: "",
        parentName: "",
        phone: "",
        address: "",
      });

      alert("Student Registered Successfully");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to register student. Please review the highlighted fields.";

      const missingFields = error?.response?.data?.missingFields;
      const missingNote = Array.isArray(missingFields) && missingFields.length
        ? ` Missing: ${missingFields.join(", ")}`
        : "";

      setErrorMessage(`${serverMessage}${missingNote}`);
      console.log("Create student error:", error?.response?.data || error);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Register New Student
        </h2>

        {errorMessage && (
          <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {/* Student Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={newStudentForm.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              className="input"
            />
          </div>

          {/* Father Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={newStudentForm.fatherName}
              onChange={handleChange}
              placeholder="Enter father name"
              className="input"
            />
          </div>

          {/* Roll Number */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={newStudentForm.rollNumber}
              onChange={handleChange}
              placeholder="Enter roll number"
              className="input"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={newStudentForm.dob}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Gender</label>
            <select
              name="gender"
              value={newStudentForm.gender}
              onChange={handleChange}
              className="input bg-slate-900 text-amber-50"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Admission Date */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Admission Date</label>
            <input
              type="date"
              name="admissionDate"
              value={newStudentForm.admissionDate}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Class */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Class</label>
            <select
              name="className"
              value={newStudentForm.className}
              onChange={handleChange}
              className="input bg-slate-900 text-amber-50"
            >
              <option value="">Select Class</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Section</label>
            <select
              name="section"
              value={newStudentForm.section}
              onChange={handleChange}
              className="input bg-slate-900 text-amber-50"
            >
              <option value="">Select Section</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          {/* Monthly Fee */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Monthly Fee</label>
            <input
              type="number"
              name="monthlyFee"
              value={newStudentForm.monthlyFee}
              onChange={handleChange}
              placeholder="Enter monthly fee"
              className="input"
            />
          </div>

          {/* Parent Name */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Parent Name</label>
            <input
              type="text"
              name="parentName"
              value={newStudentForm.parentName}
              onChange={handleChange}
              placeholder="Enter parent name"
              className="input"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={newStudentForm.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="input"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="text-sm mb-2 text-slate-400">Address</label>
            <textarea
              rows="3"
              name="address"
              value={newStudentForm.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="input"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500"
            >
              Register Student
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
