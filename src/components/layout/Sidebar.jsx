import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCat } from "react-icons/fa";
import {
  MdArrowForwardIos, MdDashboard

} from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { Logout } from "../../utils/authService";
import { Activity, BadgePlus, ChevronLeft, ChevronRight, Heart, LogOut } from "lucide-react";
export default function Sidebar({ collapsed, onTogle}) {

  const navigate = useNavigate()

  const logout = () => {
    Logout(navigate)
  }

  const menuItems = [
    {
      id: 1, path: '/dashboard', icon:
        Activity, text: 'Dashboard'
    },
    {
      id: 2, path: '/add-patient', icon:
        BadgePlus, text: 'Tambah pasien'
    },
    {
      id: 3, path: '/search-patient', icon:
        IoSearch, text: 'Cari pasien  '
    },
    {
      id: 4, path: '/medical-records', icon:
        LuNotebookPen, text: 'Rekam medis'
    },
  ]

 


  return (
    <>
      <div className={`relative bg-white shadow-xl ${collapsed ? 'md:w-17' : 'w-72'
        } transition-all duration-200 ease-in-out`}>
        <button
          onClick={onTogle}
          className="absolute  toggle-btn cursor-pointer -right-4 z-10 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all  hover:bg-gray-50"
        >
          {collapsed ? (
            <ChevronRight className=" w-7 h-7 text-pink-500" />
          ) : (
            <ChevronLeft className=" w-7 h-7 text-pink-500" />
          )}
        </button>
        <div className="my-10 mx-4 text-md md:text-xl">
          <div className="p-3 ">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg flex justify-center">
                <Heart className="w-8 h-8 text-pink-500 " />
              </div>
              {!collapsed && (
                  <h1 className=" font-bold text-gray-800 text-2xl">PetCare</h1>
            
              )}
            </div>
          </div>
          {/* Navigation Menu */}
          <nav className={`mt-5 flex flex-col text-xl  font-medium  transition-opacity duration-300 
      `}>
            <ul className="space-y-1">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <NavLink key={index} to={item.path}  className={({ isActive }) => `flex items-center text-center py-4 my-9   rounded-lg transition-all duration-200 whitespace-nowrap group
                ${isActive
                      ? '  bg-pink-50  text-pink-600  '
                      : 'text-gray-600  hover:translate-x-2 hover:bg-gray-100 hover:text-pink-600 transition-transform'
                    }
                      ${collapsed ? 'p-0':''}
                `}
                
                >
                    <a
                      href="#"
                      className={`p-2 flex items-center rounded-lg   `}
                    >
                      <IconComponent className={`w-5 h-5  ${collapsed ? ' opacity-100' : ''}`} />
                      {!collapsed && (
                        <span className="ml-3 text-xl  whitespace-nowrap">
                          {item.text}
                        </span>
                      )}
                      {/* {collapsed && (
                      <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100  pointer-events-none whitespace-nowrap">
                          {item.text}
                        </div>
                      )} */}
                    </a>
                  </NavLink>
                );
              })}
            </ul>
            <nav className={`flex text-gray-600 mt-3 items-center cursor-pointer gap-2  hover:bg-gray-100 rounded-lg `} onClick={logout}>
              <LogOut  className={`w-10 ${collapsed ? ' opacity-100' : ''}`} />
              <span className={`${collapsed ? 'opacity-0 w-0 ' : 'opacity-100 w-auto'}`}>Log out</span>
            </nav>
          </nav>
        </div>
      </div>
    </>
  );
}
