import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";


export default function MainLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}