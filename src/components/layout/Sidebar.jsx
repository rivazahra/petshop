import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import {
  MdArrowForwardIos, MdDashboard

} from "react-icons/md";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoAddCircle, IoLogOut, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { Logout } from "../../utils/authService";
import { Activity, BadgePlus, Heart } from "lucide-react";
export default function Sidebar({ collapsed, onToogle }) {
  const [currentPath, setCurrentPath] = useState('/')

  const navigate = useNavigate()

  const logout = ()=>{
    Logout(navigate)
  }

  const menuItems = [
    {
      id: 1, path: '/dashboard', icon:
        <Activity />, text: 'Dashboard'
    },
    {
      id: 2, path: '/add-patient', icon:
        <BadgePlus  size={20}/>, text: 'Tambah pasien'
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


  return (
    <>
      <div className={`left-0 top-0 overflow-hidden max-md:${collapsed}   text-gray-600 z-50   bg-white ${collapsed ? 'w-17' : 'w-72'} h-screen shadow-lg transition-all duration-200 ease-in-out fixed top-0 p-4 flex flex-col pt-10  `}>

        <button className="toggle-btn " onClick={onToogle}>
          <MdArrowForwardIos className='' color="pink" />
        </button>
        <div className="flex p-3 mb-14 items-center">

          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800">PetCare </h1>
          </div>
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
                flex items-center gap-3  p-4 rounded-lg transition-all duration-200 whitespace-nowrap group
                ${isActive
                  ? ' mr-4 bg-pink-50  text-pink-600  '
                  : 'text-gray-600 mr-4 hover:bg-gray-100 hover:text-pink-600 transition-transform'
                }
                `}
            >
              {item.icon} {item.text}
            </NavLink>
          )
          )}

          <nav className="flex items-center p-4 cursor-pointer gap-2  hover:bg-gray-100 mr-2 rounded-lg " onClick={logout}>
            <IoLogOut size={25} />
            <span className="">Log out</span>
          </nav>



        </nav>
      </div>

    </>
  );
}
