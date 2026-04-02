import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchStudentsList from "../../api/fetchStudentsList";
import { useAuth } from "../../store/Auth";

const StudentsList = () => {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentslist", token],
    queryFn: () => fetchStudentsList(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const students = data?.students || data || [];

  if (isLoading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">{error.message}</div>;
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Students List</h2>
      </div>

      <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Father Name</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Section</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Monthly Fee</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="px-6 py-4">{student.rollNumber}</td>
                  <td className="px-6 py-4 font-medium">{student.studentName}</td>
                  <td className="px-6 py-4">{student.fatherName}</td>
                  <td className="px-6 py-4">{student.className}</td>
                  <td className="px-6 py-4">{student.section}</td>
                  <td className="px-6 py-4">{student.phone}</td>
                  <td className="px-6 py-4">Rs {student.monthlyFee}</td>
                  <td className="px-6 py-4">{student.gender}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button className="text-blue-400 hover:text-blue-300">View</button>
                    <button className="text-yellow-400 hover:text-yellow-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-slate-400">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;