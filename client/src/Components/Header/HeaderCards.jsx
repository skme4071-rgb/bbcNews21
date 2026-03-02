import { FaSearch } from "react-icons/fa"
import { useState, useEffect } from "react";

import { useAuth } from "./../../context/AuthContext";
import { ContextFocusBox } from "./../../context/FocusBoxContext";
import Signin from "./../Authentication/Signin";
import Register from "./../Authentication/Register";
import { CustomNavLink, CustomLink } from "./../../utilities/Element";
import Logout from "./../Authentication/logout";


export function Userdropdown({ className, user }) {

  const { firstName, lastName, email } = user

  return (
    <div
      className={`user-dropdown ${className}  absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 z-100`}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span id="dropdown-avatar" className="text-white font-bold">
              JD
            </span>
          </div>
          <div>
            <p id="dropdown-name" className="font-semibold">
              {firstName} {lastName}
            </p>
            <p id="dropdown-email" className="text-sm text-gray-500">
              {email.slice(0, 18)}
            </p>
          </div>
        </div>
      </div>
      <div className="py-2">

        <CustomLink
          to="/Profile"
          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg mr-2">👤</span>
          <span>My Profile</span>
        </CustomLink>


        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">📰</span>
          <span>My Articles</span>
          <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            3
          </span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">🔖</span>
          <span>Bookmarks</span>
          <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
            12
          </span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">🔔</span>
          <span>Notifications</span>
          <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
            5
          </span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </a>
      </div>
      <Logout />

    </div>
  );
}
export function AuthButtons({ buttonName = [] }) {
  const { setFocusBox } = ContextFocusBox();

  return (
    <div className="flex items-center space-x-4">
      {buttonName.map((v, i) => (
        <button
          key={v}
          onClick={() => setFocusBox([<Signin />, <Register />][i])}
          className="hover:text-gray-300 transition-colors hidden md:inline-block"
        >
          {v}
        </button>
      ))
      }
    </div >
  );
}
export function MobileSearch({ show }) {
  return (
    <div className={`sm:hidden border-t border-gray-700 py-4 ${show}`}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search BBC News..."
          className="bg-gray-800 text-white px-4 py-3 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 w-full mobile-search"
        />

        <div className="w-4 h-4 text-gray-400 absolute right-3 top-4">
          <FaSearch />
        </div>

      </div>
    </div>
  );
}
export function Navigation({ pagesName = [], onClick }) {
  return (
    <nav className="bbc-red shadow-md  sticky top-0 w-[100%] z-50">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto  mobile-nav-scroll">
          {pagesName.map((v) => (
            <CustomNavLink
              onClick={onClick}
              key={v}
              text={v}
              to={v === "Home" ? "/" : `/${v.toLowerCase()}`}
              end={v === "Home"} // 👈 Home exact match
              activeFun={(isActive) =>
                `nav-item text-white px-4 py-3 text-sm font-medium whitespace-nowrap mobile-touch-target ${isActive ? "active" : "unactive"
                }`
              }
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
export function Search() {
  return (
    <div className="relative hidden sm:block">
      <input
        type="search"
        placeholder="Search BBC News..."
        className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg border border-gray-600 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 w-64 mobile-search transition-all"
      />
      <svg
        className="w-4 h-4 text-gray-400 absolute right-3 top-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
}
export function UserSection() {
  const [showClass, setClass] = useState(false);
  const { user } = useAuth()



  useEffect(() => {
    if (user?.loggedIn) setClass(false);
  }, [user?.loggedIn]);


  return (

    <>{user?.loggedIn && <div id="user-section" className=" relative">
      <button
        onClick={() =>
          setClass((prev) => {
            return !prev;
          })
        }
        className="flex items-center space-x-2 hover:text-gray-300  transition-colors"
      >
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
          <span id="user-avatar" className="uppercase text-sm font-bold">
            {/* {user.firstName[0] + user.lastName[0]} */}
          </span>
        </div>

        <span id="user-name" className="hidden md:inline">
          {user.firstName}
        </span>

        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        <span
          id="notification-badge"
          className="notification-badge w-2 h-2 bg-red-500 rounded-full hidden"
        ></span>
      </button>

      <Userdropdown user={user} isLogin={user?.loggedIn} className={showClass ? "show" : "hidden"} />
    </div>}
    </>

  );
}
export function WeatherBar() {
  return (
    <div className="flex items-center space-x-6">
      <span className="hidden md:inline text-gray-300">
        Tuesday, 17 December 2024
      </span>

      <span className="text-gray-300">London, UK</span>

      <div className="flex items-center space-x-2">
        <span className="text-yellow-400">🌧️</span>
        <span className="font-medium text-white">8°C</span>
      </div>
    </div>
  );
}
export function MobileMenu({
  show,
  pagesName = [],
  onClick,
  icon = [],
}) {
  const { setFocusBox } = ContextFocusBox();
  return (
    <div className={`md:hidden bg-red-700 text-white  shadow-lg ${show}`}>

      <div className="px-4 py-3 space-y-1">
        {pagesName.map((v, i) => (
          <CustomNavLink
            onClick={onClick}
            key={v}
            icon={icon[i]}
            text={v}
            to={v === "Home" ? "/" : `/${v.toLowerCase()}`}
            end={v === "/"} // 👈 Home exact match
            className="nav-item  text-white   rounded-lg hover:bg-red-600 transition-colors mobile-touch-target"
          />
        ))}

        <div className="border-t border-red-600 pt-3 mt-3">
          <button
            onClick={() => setFocusBox(<Signin />)}
            className="block w-full text-left py-3 px-4 rounded-lg hover:bg-red-600 transition-colors mobile-touch-target"
          >
            🔐 Sign In
          </button>
          <button
            onClick={() => setFocusBox(<Register />)}
            className="block w-full text-left py-3 px-4 rounded-lg hover:bg-red-600 transition-colors mobile-touch-target"
          >
            📝 Register
          </button>
          <button

            className="block w-full text-left py-3 px-4 rounded-lg hover:bg-red-600 transition-colors mobile-touch-target"
          >
            👤 My Account
          </button>
        </div>
      </div>
    </div>
  );
}
