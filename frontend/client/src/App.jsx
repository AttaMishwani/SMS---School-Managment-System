import { Routes, Route } from "react-router-dom";
import {lazy , Suspense} from "react"
const MainLayout  = lazy(()=> import("./layouts/MainLayout"));
const AdminDashboard = lazy(()=> import("./pages/AdminDashboard"));
const Login = lazy(()=> import("./pages/Login"));
const Signup = lazy(()=> import("./pages/Signup"));
const SuperAdminDashboard = lazy(()=> import("./pages/SuperAdminDashboard"))


export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/superadmindashboard" element={<SuperAdminDashboard/>} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />
      </Route>
    </Routes>
    </Suspense>
  );
}