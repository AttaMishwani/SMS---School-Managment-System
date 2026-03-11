import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/Auth";
const URL = "http://localhost:5000/api/adminDashboard/createnewstudent"




export default function CreateNewStudent() {
const {token} = useAuth();
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
    address: ""
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewStudentForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("Student Form Data:", newStudentForm);

  try {
    const response = await axios.post(URL , newStudentForm , {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    }) 

    const data = response.data;
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
    address: ""
  })

  alert("Student Registered Successfully");
  } catch (error) {
    console.log(error)
  }

 
  };

  return (
    <div className="p-6 text-white">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">
          Register New Student
        </h2>

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
              className="input"
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
              className="input"
            >
              <option value="">Select Class</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-slate-400">Section</label>
            <select
              name="section"
              value={newStudentForm.section}
              onChange={handleChange}
              className="input"
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