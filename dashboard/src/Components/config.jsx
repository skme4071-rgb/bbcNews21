import {
  FaTachometerAlt,
  FaUsers,
  FaUserEdit,
  FaEdit,
  FaNewspaper,
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaUserShield
} from "react-icons/fa";


export const  menuItems = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },

  { name: "User Management", icon: FaUsers, badge: 247, color: "bg-blue-500", path: "Users" },

  { name: "Reporters", icon: FaUserEdit, badge: 23, color: "bg-green-500", path: "Reporters" },

  { name: "Editors", icon: FaEdit, badge: 12, color: "bg-yellow-500", path: "Editors" },

  { name: "News Articles", icon: FaNewspaper, badge: 156, color: "bg-purple-500", path: "Analytics" },

  { name: "Messages", icon: FaEnvelope, badge: 8, color: "bg-red-500", path: "Messages" },

  { name: "Analytics", icon: FaChartLine, path: "Analytics" },

  { name: "Settings", icon: FaCog, path: "Settings" },

//   { name: "Admin User", icon: FaUserShield, path: "/admin" }
];