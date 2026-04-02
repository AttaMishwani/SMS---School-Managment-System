import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";


export default function MainLayout() {
  return (
    <div className="min-h-screen w-full border-2 ">
      <Navbar />
      <main className="flex-1 w-full border-2 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}