import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import {
  MdArrowForwardIos, MdDashboard

} from "react-icons/md";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoAddCircle, IoSearch } from "react-icons/io5";
export default function Sidebar({ collapsed, onToogle }) {
  return (
    <>
      <div className={`left-0 top-0  overflow-hidden z-50 bg-[#2c3e50] ${collapsed ? 'w-17' : 'w-72'}  h-screen transition-all duration-300 ease-in-out  fixed top-0 flex flex-col pl-8 pt-10 text-white`}>

        <button className="toggle-btn" onClick={onToogle}>
          <MdArrowForwardIos className={`arrow left-2 `} color="black" />
        </button>
        <div className="flex gap-4 mb-14 items-center">
          <FaCat className="w-8 h-8  rounded-lg flex items-center justify-center text-xl flex-shrink-0 z-10" />
          <div className={`font-bold text-3xl transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`} >Pet Care</div>
        </div>

        <nav className={`flex flex-col gap-10 text-xl font-medium space-y-3 transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
          <Link to="/dashboard" className="flex gap-3 active items-center hover:text-gray-200">
            <MdDashboard />
            Dashboard
          </Link>

          <Link to="/add-patient" className="flex gap-3 items-center hover:text-gray-200">
            <IoIosAddCircleOutline className="" />
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
    
</>
  );
}
