import { menuItems, Logout } from "./config";
import { CustomNavLink } from "./../utilities/Element";
import { useToggle } from "./../context/ToggleContext";




const NavItemsComponent = ({ menuItems = [] }) => {
  return (
    <nav className="space-y-2">
      {menuItems.map((item, i) => {

        const Icon = item.icon;

        return (
          <CustomNavLink to={item.path} key={i} end={item.path === "/Dashboard"}>
            <button className="admin-nav-item w-full text-left px-4 py-3 text-gray-300 hover:text-white flex items-center space-x-3" >
              <span>
                <Icon />
              </span>

              <span>{item.name}</span>

              {item.badge && (
                <span className={`ml-auto ${item.color} text-white text-xs px-2 py-1 rounded-full`}>
                  {item.badge}
                </span>
              )}
            </button>
          </CustomNavLink>

        );

      })}
    </nav>
  );
};






export default function Sidebar() {

  const { toggle } = useToggle()


  
  
  return (
    <div
      className={`${toggle.isSidebarActive ? "show" : "hidden"}  admin-sidebar fixed left-0 top-0 h-full w-64 z-50 overflow-y-auto`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div
            className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"
          >
            <span className="text-white font-bold">BBC</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Management Dashboard</p>
          </div>
        </div>

        <NavItemsComponent menuItems={menuItems} />

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">AD</span>
            </div>
            <div>
              <p className="text-white font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Super Administrator</p>
            </div>
          </div>

          <button
            onClick={Logout}
            className="w-full text-left px-4 py-3 text-gray-400 hover:text-white flex items-center space-x-3 transition-colors">
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}