import { createContext, useContext, useState, useEffect } from "react";

const ToggleContext = createContext(null);

export default function ToggleProvider({ children }) {

  const [toggle, setToggle] = useState(() => {
    return {
      isSidebarActive: window.innerWidth >= 768
    };
  });

  const toggleAdminSidebar = () => {
    setToggle((prev) => ({
      ...prev,
      isSidebarActive: !prev.isSidebarActive
    }));
  };

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggle({ isSidebarActive: true });
      } else {
        setToggle({ isSidebarActive: false });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <ToggleContext.Provider value={{ toggle, toggleAdminSidebar }}>
      {children}
    </ToggleContext.Provider>
  );
}

export const useToggle = () => useContext(ToggleContext);