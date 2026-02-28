import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome, Admin! This is your dashboard.
        </p>
        <div className="flex flex-col gap-4">
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Manage Users
          </button>
          <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Generate Reports
          </button>
          <button className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
            School Settings
          </button>
        </div>
      </div>
    </div>
  );
}