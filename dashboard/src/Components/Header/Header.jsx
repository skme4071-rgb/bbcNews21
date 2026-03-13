


import { FaBars } from "react-icons/fa";


import { useToggle } from "./../../context/ToggleContext";


export default function Header() {
  const { toggleAdminSidebar } = useToggle()
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={toggleAdminSidebar} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <FaBars />
          </button>
          <h1 id="admin-title" className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            // onclick="openMessageModal()"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xl">💬</span>
            <span
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center notification-badge"
            >8</span
            >
          </button>
          <button
            // onclick="toggleNotifications()"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xl">🔔</span>
            <span
              className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
            >3</span
            >
          </button>
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">AD</span>
            </div>
            <span className="font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )

}

