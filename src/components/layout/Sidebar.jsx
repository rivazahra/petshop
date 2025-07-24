import { Link } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import { MdArrowForwardIos, MdDashboard 

} from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function Sidebar() {
  const [barOpen, setBarOpen] = useState(false)

  
  const handleClick = () =>{
    setBarOpen(!barOpen)
  }
  return (
    <>
      {barOpen && (
      <div 
        className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
        onClick={() => setBarOpen(false)}
      />
    )}
    <div className={`sidebar ${barOpen ? 'left-0' : 'md:left-0 max-md:left-[-calc(100%-3rem)]'} w-[20%] bg-[#2c3e50]  h-screen transition-all duration-300 fixed top-0 flex flex-col pl-8 pt-10 text-white`}>
      <span 
      onClick={handleClick}
      className="bg-gray-400 self-center cursor-pointer rounded-full p-2 w-10 mt-4 md:hidden z-10"
    >
      <MdArrowForwardIos className={`transition-transform duration-300 ${barOpen ? 'rotate-180' : ''}`} />
    </span>
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
    
</>
  );
}
