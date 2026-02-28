import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const URL = "http://localhost:5000/api/auth/signup";


export default function Signup() {
  const navigate  = useNavigate();

  const [form, setForm] = useState({
    schoolName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =    async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const payload = {
      schoolName: form.schoolName,
      adminName: form.adminName,
      email: form.email,
      password: form.password,
    }
    
    try {
      const response = await fetch(URL , {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      });

      const raw = await response.text();
      let res = null;
      try {
        res = raw ? JSON.parse(raw) : null;
      } catch {
        res = { message: raw };
      }

      if (!response.ok) {
        console.error("Signup failed", {
          status: response.status,
          statusText: response.statusText,
          requestPayload: payload,
          responseBody: res,
        });
        setError(res?.message || `Signup failed (${response.status})`);
        return;
      }

      if(response.ok){
        setForm({
          schoolName: "",
          adminName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        alert("signed up successfully, wait for super admin approval");
     
        navigate("/login")
      }
     
     
    } catch (error) {
      console.log(error)
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create School Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* School Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              School Name
            </label>
            <input
              type="text"
              name="schoolName"
              value={form.schoolName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter school name"
            />
          </div>

          {/* Admin Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin Name
            </label>
            <input
              type="text"
              name="adminName"
              value={form.adminName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
