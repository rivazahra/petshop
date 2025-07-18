import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="w-[20%] bg-blue-500 h-screen sticky top-0 flex flex-col pl-8 pt-10 text-white">
      <div className="flex gap-4 mb-14 items-center">
        <FaCat className="text-3xl" />
        <div className="font-bold text-3xl">Pet Care</div>
      </div>

      <nav className="flex flex-col gap-10 text-lg font-medium">
        <Link to="/dashboard" className="flex gap-3 active items-center hover:text-gray-200">
          <MdDashboard />
          Dashboard
        </Link>

        <Link to="/add-patient" className="flex gap-3 items-center hover:text-gray-200">
          <IoIosAdd className="text-2xl" />
          Tambah Pasien
        </Link>

        <Link to="/search-patient" className="flex gap-3 items-center hover:text-gray-200">
          <IoSearch size={20} />
          Cari Pasien
        </Link>

        <Link to="/medical-records" className="flex gap-3 items-center hover:text-gray-200">
          <LuNotebookPen />
          Rekam Medis
        </Link>
      </nav>
    </div>
  );
}
