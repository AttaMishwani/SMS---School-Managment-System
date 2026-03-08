import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";


const URL = "http://localhost:5000/api/auth/login";

export default function Login() {
  const {storeTokenInLs} = useAuth()
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
console.log(response)
      const res = await response.json();
console.log(res)
      if (!response.ok) {
        setError(res?.message || "Login failed");
        return;
      }

      if (res?.isSuperAdmin) {
        console.log(res.user.token);
        storeTokenInLs(res.user.token)
        navigate("/superadmindashboard");
        return;
      }
      
      if (res?.isSchoolAdmin) {
        console.log(res.user.token);
        storeTokenInLs(res.user.token)
        navigate("/admindashboard");
        return;
      }

      setError("User role is not allowed to login here");
    } catch (err) {
      console.log(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center w-full border-2 border-red-950 justify-center bg-black">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          School Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your email"
            />
          </div>

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
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
