import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import {
  MdArrowForwardIos, MdDashboard

} from "react-icons/md";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoAddCircle, IoLogOut, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { supabase } from "../../utils/supabase/client";
import { createClient } from "@supabase/supabase-js";
export default function Sidebar({ collapsed, onToogle, setCollapse }) {
  const [currentPath, setCurrentPath] = useState('/')

  const navigate = useNavigate()

  const menuItems = [
    {
      id: 1, path: '/dashboard', icon:
        <MdDashboard />, text: 'Dashboard'
    },
    {
      id: 2, path: '/add-patient', icon:
        <IoIosAddCircleOutline />, text: 'Tambah pasien'
    },
    {
      id: 3, path: '/search-patient', icon:
        <IoSearch />, text: 'Cari pasien'
    },
    {
      id: 4, path: '/medical-records', icon:
        <LuNotebookPen />, text: 'Rekam medis'
    },
  ]

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')

  }
  return (
    <>
      <div className={`left-0 top-0 overflow-hidden z-50 bg-[#2c3e50] ${collapsed ? 'w-17' : 'w-72'} h-screen
        transition-all duration-300 ease-in-out fixed top-0 flex flex-col pl-8 pt-10 text-white`}>

        <button className="toggle-btn" onClick={onToogle}>
          <MdArrowForwardIos className={`arrow left-2 `} color="black" />
        </button>
        <div className="flex gap-4 mb-14 items-center">
          <FaCat className="w-8 h-8  rounded-lg flex items-center justify-center text-xl flex-shrink-0 z-10" />
          <div className={`font-bold text-3xl transition-opacity duration-300 ${collapsed ? 'opacity-0'
            : 'opacity-100'}`}>VetCare</div>
        </div>

        <nav className={`flex flex-col gap-10 text-xl font-medium  space-y-3 transition-opacity duration-300 ml-2 ${collapsed
          ? 'opacity-0' : 'opacity-100'}`}>

          {/* const isActive = currentPath === item.path */}
          {menuItems.map((item) => (

            <NavLink to={item.path} key={item.id} onClick={() => {
              setCurrentPath(item.path)
              // setCollapse(true)
            }}
              className={({ isActive }) => `
                flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 whitespace-nowrap group
                ${isActive
                  ? 'bg-white/10 mr-2 text-white shadow-sm'
                  : 'text-white/80 hover:text-white mr-2 hover:bg-white/10'
                }
                `}
            >
              {item.icon} {item.text}
            </NavLink>
          )
          )}

          <nav className="flex items-center py-3 px-3 cursor-pointer gap-2 text-white/80 hover:text-white mr-2 rounded-lg hover:bg-white/10" onClick={handleLogOut}>
            <IoLogOut size={25} />
            <span className="">Log out</span>
          </nav>



        </nav>
      </div>

    </>
  );
}
