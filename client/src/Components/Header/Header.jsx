import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa"

import { LogoSVG } from "./../../utilities/Element";
import { useAuth } from "./../../context/AuthContext";


import { MobileSearch, WeatherBar, AuthButtons, Search, UserSection, MobileMenu, Navigation } from "./HeaderCards";

const pagesName1 = [
  "Home",
  "UK",
  "World",
  "Business",
  "Politics",
  "Technology",
  "Science",
  "Health",
  "Sport",
];
const icon = ["🏠", "GB", "🌍", "💼", "🏛️", "💻", "🔬", "🏥", "👤"];
export default function Header() {
  const [showmMobileSesrch, setShowmMobileSesrch] = useState(false);
  const [showmMobileMenu, setShowmMobileMenu] = useState(false);

  const { user } = useAuth();


  return (
    <>
      <header className="bg-black text-white shadow-lg ">
        <div className="container mx-auto px-4">
          <div className="hidden sm:flex justify-between items-center py-2.5 text-sm border-b border-gray-700">
            <WeatherBar />
            {!user?.loggedIn && <AuthButtons buttonName={["Signin", "Register"]} />}
            <UserSection />
          </div>

          <div className="flex justify-between items-center py-4 mobile-header-compact">
            <LogoSVG />

            <div className="flex items-center space-x-3">
              <Search />

              <button
                className="sm:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() =>
                  setShowmMobileSesrch((prev) => {
                    return !prev;
                  })
                }
              >
                <FaSearch />
              </button>


              <button
                onClick={() =>
                  setShowmMobileMenu((prev) => {
                    return !prev;
                  })}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FaBars />
              </button>

            </div>
          </div>

          <MobileSearch show={showmMobileSesrch ? "show" : "hidden"} />
        </div>


        <MobileMenu
          onClick={() =>
            setShowmMobileMenu((prev) => {
              return !prev;
            })
          }
          icon={icon}
          show={showmMobileMenu ? "show" : "hidden"}
          pagesName={pagesName1}
        />
      </header>

      <Navigation
        pagesName={pagesName1}
        onClick={() => setShowmMobileMenu(false)}
      />
    </>


  );
}
